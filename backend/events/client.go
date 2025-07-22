package events

import (
	"fmt"

	"github.com/gorilla/websocket"
)

type Client struct {
	Conn *websocket.Conn
	Send chan []string
	Room *Room
}

func NewClient(conn *websocket.Conn, room *Room) *Client {
	// Create new client
	return &Client{
		conn,
		make(chan []string),
		room}
}

func (c *Client) readPump() {
	// same here probably close connection
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
	// Maybe wanna close connection idk
	for message := range c.Send {
		err := c.Conn.WriteJSON(message)

		if err != nil {
			return
		}
	}

}
