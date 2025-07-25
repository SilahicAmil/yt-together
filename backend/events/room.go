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
	// Lock it or else some funkyness happens
	r.mu.Lock()
	defer r.mu.Unlock()

	r.Clients[client] = true
}

func (r *Room) RemoveClient(client *Client) {
	// Lock it or else some clients dont get removed idk
	r.mu.Lock()
	defer r.mu.Unlock()

	delete(r.Clients, client)
}

func (r *Room) BroadcastMessage(message string) {
	// Lock it or else skips some messages
	r.mu.Lock()
	defer r.mu.Unlock()

	fmt.Printf("Broadcasting message to %d clients in room %s\n", len(r.Clients), r.ID)

	for client := range r.Clients {
		client.Send <- []string{message}
	}
}
