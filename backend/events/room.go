package events

type Room struct {
	ID         string
	Clients    map[*Client]bool
	VideoState any
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
	for client := range r.Clients {
		client.Send <- []string{message}
	}
}
