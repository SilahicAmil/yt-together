import { useEffect, useState } from "react";
import { useParams } from "react-router";
import useWebSocket from "react-use-websocket";

export default function RoomDetails() {
  const [youtubeLink, setYoutubeLink] = useState("");
  let { id } = useParams();

  const socketUrl = `ws://localhost:8080/ws/${id}`; // Use ws:// when doing ws

  const { sendJsonMessage, lastMessage } = useWebSocket(socketUrl);

  useEffect(() => {
    if (lastMessage !== null) {
      console.log("Received message:", lastMessage.data);
    }
  }, [lastMessage]);

  function handleYoutubeLink(e) {
    e.preventDefault();
    var videoLink = e.target.value;
    if (videoLink.includes("/watch?v=")) {
      console.log("contains");
      videoLink = videoLink.replace("watch?v=", "embed/");
    }
    setYoutubeLink(videoLink);
    // Push to some type of history
  }

  function handlePlay(e) {
    sendJsonMessage({ action: "play" });
  }

  return (
    //
    // Extract each one of these to its own component
    // User and Watch History will be some type of reusable like card component
    //
    <>
      <div className="flex justify-center items-center">
        <h1 className="text-4xl">ROOM NAME</h1>
      </div>
      <div className="m-5 lg:float-left lg:w-[60%]">
        <div className="">
          <input
            type="search"
            value={youtubeLink}
            onChange={handleYoutubeLink}
            className="bg-amber-300 lg:w-1/3 rounded-xl pl-4 w-full h-16"
          />
        </div>
        <div className="h-125 w-full mt-5 flex items-center justify-center">
          <iframe src={youtubeLink} className="w-full h-full"></iframe>
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
