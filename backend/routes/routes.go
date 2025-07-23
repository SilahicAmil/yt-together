package routes

import (
	"github.com/gin-gonic/gin"
)

func RegisterRouteEvents(server *gin.Engine) {
	server.POST("/room/create", newRoom)
	server.GET("/ws/:id", joinRoom)
	// server.GET() // This will be youtube API route to fetch video for frontend
}
