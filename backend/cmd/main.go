package main

import (
	"fmt"
	"net/http"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
	"github.com/google/uuid"
)

func main() {
	fmt.Println("HELLOW WORLD")

	server := gin.Default()

	// Allow all origins for now - Find better way for this later
	server.Use(cors.Default())

	server.POST("/createRoom", func(ctx *gin.Context) {
		ctx.JSON(http.StatusOK, gin.H{"message": "Created 123!", "roomId": uuid.New()})
	})

	server.Run(":8080")
}
