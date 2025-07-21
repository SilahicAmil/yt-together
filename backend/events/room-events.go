package events

import (
	"fmt"
	"net/http"
	"time"

	"github.com/gin-gonic/gin"
	"github.com/gorilla/websocket"
)

// upgrade http connection to websockets
var upgrader = websocket.Upgrader{
	ReadBufferSize:  1024,
	WriteBufferSize: 1024,
	CheckOrigin: func(r *http.Request) bool {
		return true // Allow all origins (unsafe in prod)
	},
}

func Connect(w http.ResponseWriter, r *http.Request) {

	conn, err := upgrader.Upgrade(w, r, nil)

	if err != nil {
		fmt.Println(err)
		return
	}
	defer conn.Close()

	for {
		conn.WriteJSON(gin.H{"message": "Video Started!"})
		// conn.WriteMessage(websocket.TextMessage, []byte("Hello From Websockets from GO"))
		time.Sleep(time.Second * 2)
	}
}
