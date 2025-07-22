package events

import (
	"fmt"
	"net/http"

	"github.com/gorilla/websocket"
)

var rooms = make(map[string]*Room)

// upgrade http connection to websockets
var upgrader = websocket.Upgrader{
	ReadBufferSize:  1024,
	WriteBufferSize: 1024,
	CheckOrigin: func(r *http.Request) bool {
		return true // Allow all origins (unsafe in prod)
	},
}

func Connect(w http.ResponseWriter, r *http.Request, roomID string) {

	conn, err := upgrader.Upgrade(w, r, nil)

	if err != nil {
		fmt.Println(err)
		return
	}

	room, exists := rooms[roomID]

	if !exists {
		room = NewRoom(roomID)
		rooms[roomID] = room
	}

	// Create a new CLient and add it to the room
	client := NewClient(conn, room)
	room.AddClient(client)

	// Start reading and writing goroutines
	go client.readPump()
	go client.writePump()

	// Send an initial message client.Send
	client.Send <- []string{"Welcome to my room"}

	// Can also broadcast a message to all clients in the ROom
	room.BroadcastMessage("Whats up guys")
}
