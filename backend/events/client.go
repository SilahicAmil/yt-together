package events

import (
	"fmt"
	"sync"

	"github.com/gorilla/websocket"
)

type Client struct {
	Conn *websocket.Conn
	Send chan []string
	Room *Room
	mu   sync.Mutex
}

func NewClient(conn *websocket.Conn, room *Room) *Client {
	// Create new client
	return &Client{
		Conn: conn,
		Send: make(chan []string),
		Room: room}
}

func (c *Client) readPump() {
	// DO this or else the frontend wont re-connect
	defer func() {
		c.Room.RemoveClient(c) // Remove Client
		c.Conn.Close()         // Close socket
	}()

	for {
		var message map[string]any
		err := c.Conn.ReadJSON(&message)
		if err != nil {
			fmt.Println("Error reading message:", err)
			break
		}

		action, ok := message["action"].(string)
		if ok {
			switch action {
			case "play":
				c.Room.BroadcastMessage("Playing video!")
			case "pause":
				c.Room.BroadcastMessage("Paused video!")
			}
		}
	}
}

func (c *Client) writePump() {
	// DO this or else the frontend wont re-connect
	defer func() {
		c.Room.RemoveClient(c) // Remove Client
		c.Conn.Close()         // Close socket
	}()

	for message := range c.Send {
		err := c.Conn.WriteJSON(message)

		if err != nil {
			return
		}
	}

}
