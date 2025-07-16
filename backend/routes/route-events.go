package routes

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/google/uuid"
)

func newRoom(ctx *gin.Context) {
	ctx.JSON(http.StatusOK, gin.H{"message": "Created 123!", "roomId": uuid.New()})
}

// make this into like a ws/:id
func joinRoom(ctx *gin.Context) {
	roomID := ctx.Param("id")
	ctx.JSON(http.StatusOK, gin.H{"message": "Joined Room ", "roomId": roomID})

	//
	// create websocket
	// create handlePlayer function for like pause and play and loading new video
	// start with pause and play for new
	//
}

func leaveRoom(ctx *gin.Context) {
	// close websocket connections and etc
}
