package routes

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/google/uuid"
)

func newRoom(ctx *gin.Context) {
	ctx.JSON(http.StatusOK, gin.H{"message": "Created 123!", "roomId": uuid.New()})
}

func joinRoom() {}

func leaveRoom() {}
