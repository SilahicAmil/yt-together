import { useEffect, useMemo, useRef, useState } from "react";
import { useParams } from "react-router";
import useWebSocket from "react-use-websocket";
import ReactPlayer from "react-player";

export default function RoomDetails() {
  const [youtubeLink, setYoutubeLink] = useState("");
  const [videoPlaying, setVideoPlaying] = useState(false);
  let { id } = useParams();

  // Gotta memoize this or else it loses connection on re-render
  // and we all know React never re-renders lol
  const socketUrl = useMemo(() => `ws://localhost:8080/ws/${123}`, [id]);

  const { sendJsonMessage, lastMessage } = useWebSocket(socketUrl, {
    onOpen: () => console.log("WebSocket connected"),
    onClose: (event) =>
      console.log("WebSocket disconnected", event.code, event.reason),
    onError: (e) => console.error("WebSocket error", e),
    shouldReconnect: () => true,
  });

  useEffect(() => {
    if (lastMessage !== null) {
      console.log(lastMessage.data); // Logs: '["Paused video!"]'

      var parsedData = JSON.parse(lastMessage.data);

      if (parsedData[0] === "Paused video!") {
        setVideoPlaying(false);
      } else if (parsedData[0] === "Playing video!") {
        setVideoPlaying(true);
      }
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

  // Could probably combine both of these into 1 function
  // Just check the current state of videoPlaying. We know if its true it is
  // So the user want to pause it and vice versa
  // Something i'll do later
  function handlePlay() {
    sendJsonMessage({ action: "play" });
  }

  function handlePause() {
    sendJsonMessage({ action: "pause" });
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
        <div className="h-125 w-full  mt-5 flex items-center justify-center">
          {/* <iframe
            src={youtubeLink}
            className="w-full h-full"
            ref={playerRef}
            onClick={(e) => console.log(e)}
          /> */}
          <ReactPlayer
            src={youtubeLink}
            width={"100%"}
            height={"100%"}
            playing={videoPlaying}
            onPlay={handlePlay}
            onPause={handlePause}
          />
        </div>
        <button onClick={handlePlay}>&nbsp;PLAY</button>
        <button onClick={handlePause}>&nbsp;PAUSE</button>
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
