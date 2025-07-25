package events

import (
	"fmt"
	"sync"
)

type Room struct {
	ID         string
	Clients    map[*Client]bool
	VideoState any
	mu         sync.Mutex
}

func NewRoom(id string) *Room {
	return &Room{
		ID:      id,
		Clients: make(map[*Client]bool)}
}

func (r *Room) AddClient(client *Client) {
	r.Clients[client] = true
}

func (r *Room) RemoveClient(client *Client) {
	delete(r.Clients, client)
}

func (r *Room) BroadcastMessage(message string) {
	r.mu.Lock()
	defer r.mu.Unlock()

	fmt.Printf("Broadcasting message to %d clients in room %s\n", len(r.Clients), r.ID)

	for client := range r.Clients {
		client.Send <- []string{message}
	}
}
