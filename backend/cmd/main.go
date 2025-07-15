package main

import (
	"github.com/SilahicAmil/yt-together/routes"
	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
)

func main() {
	server := gin.Default()

	// Allow all origins for now - Find better way for this later
	server.Use(cors.Default())

	routes.RegisterRouteEvents(server)

	server.Run(":8080")
}
