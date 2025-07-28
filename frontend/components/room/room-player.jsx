import ReactPlayer from "react-player";
import { useEffect, useMemo, useState, useCallback } from "react";
import useWebSocket from "react-use-websocket";

function RoomPlayer({ id }) {
  const [youtubeLink, setYoutubeLink] = useState("");
  const [videoPlaying, setVideoPlaying] = useState(false);
  const [watchHistory, setWatchHistory] = useState([]);

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
      console.log(lastMessage.data);

      var parsedData;
      try {
        var parsedData = JSON.parse(lastMessage.data);
      } catch (e) {
        // Stop playing video
        setVideoPlaying(false);
        // Maybe have some type of error state or something idk
      }

      if (parsedData[0] === "Paused video!") {
        setVideoPlaying(false);
      } else if (parsedData[0] === "Playing video!") {
        setVideoPlaying(true);
      }
    }
  }, [lastMessage]);

  // Wrap in a useCallback or else evertime we press thi ReactPlayer re-renders and causes somefunkyness
  const handlePlayerPlayPause = useCallback(() => {
    if (videoPlaying == true) {
      sendJsonMessage({ action: "pause" });
    } else {
      sendJsonMessage({ action: "play" });
    }
  });

  function handleYoutubeLink(e) {
    e.preventDefault();
    var videoLink = e.target.value;

    if (videoLink.includes("/watch?v=")) {
      console.log("contains");
      videoLink = videoLink.replace("watch?v=", "embed/");

      setYoutubeLink(videoLink);
      //   setWatchHistory((prev) => [...prev, videoLink]);
    } else {
      setYoutubeLink("");
    }
    // Push to some type of history
  }
  console.log(watchHistory);
  return (
    <>
      <div className="">
        <input
          type="search"
          value={youtubeLink}
          onChange={handleYoutubeLink}
          className="bg-amber-300 lg:w-1/3 rounded-xl pl-4 w-full h-16"
        />
      </div>
      <div className="h-125 w-full  mt-5 flex items-center justify-center">
        <ReactPlayer
          src={youtubeLink}
          width={"100%"}
          height={"100%"}
          playing={videoPlaying}
        />
      </div>
      <button onClick={handlePlayerPlayPause}>&nbsp;PLAY/PAUSE</button>

      {/* {watchHistory?.map((item) => {
        return <p key={item.id}>{item}</p>;
      })} */}
    </>
  );
}

export default RoomPlayer;
