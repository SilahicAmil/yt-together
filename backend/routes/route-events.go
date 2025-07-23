package routes

import (
	"net/http"

	"github.com/SilahicAmil/yt-together/events"
	"github.com/gin-gonic/gin"
	"github.com/google/uuid"
)

func newRoom(ctx *gin.Context) {
	ctx.JSON(http.StatusOK, gin.H{"message": "Created 123!", "roomId": uuid.New()})
}

// make this into like a ws/:id
func joinRoom(ctx *gin.Context) {
	roomID := ctx.Param("id")
	// ctx.JSON(http.StatusOK, gin.H{"message": "Joined Room ", "roomId": roomID})

	//
	// create websocket
	events.Connect(ctx.Writer, ctx.Request, roomID)
}

func leaveRoom(ctx *gin.Context) {
	// close websocket connections and etc
}
