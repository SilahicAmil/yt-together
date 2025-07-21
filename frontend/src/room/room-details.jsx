import { useEffect } from "react";
import { useParams } from "react-router";
import useWebSocket from "react-use-websocket";

export default function RoomDetails() {
  let { id } = useParams();

  const socketUrl = "ws://localhost:8080/ws/123"; // Use ws:// when doing ws

  const { _, lastMessage } = useWebSocket(socketUrl);

  useEffect(() => {
    if (lastMessage !== null) {
      console.log("Received message:", lastMessage.data);
    }
  }, [lastMessage]);

  return (
    //
    // :Extract each one of these to its own component
    // User and Watch History will be some type of reusable like card component
    //
    <>
      <div className="flex justify-center items-center">
        <h1 className="text-4xl">ROOM NAME</h1>
      </div>
      <div className="m-5 lg:float-left lg:w-[60%]">
        <div className="mb-4 flex gap-24">
          <input
            type="search"
            defaultValue="YOUTUBE VIDEO LINK"
            className="bg-amber-300 lg:w-1/3 rounded-xl pl-4"
          />

          <button className="bg-blue-300 p-4 rounded-xl lg:w-32">Enter</button>
        </div>
        <h1 className="text-2xl font-mono">YOUTUBE VIDEO TITLE</h1>
        <div className="h-125 w-full mt-5 bg-green-300 flex items-center justify-center">
          YOUTUBE VIDEO
        </div>
      </div>
      <div className="lg:float-right lg:w-[30%] h-full m-5">
        <div className="h-64 w-full bg-red-500">
          <p>User 1 has joined the room!</p>
        </div>
        <div className="h-64 w-full bg-pink-300 mt-4">
          <p>WATCH HISTORY</p>
        </div>
      </div>
    </>
  );
}
