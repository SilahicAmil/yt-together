export default function RoomDetails() {
  return (
    <>
      <div className="flex justify-center items-center">
        <h1 className="text-4xl">ROOM NAME</h1>
      </div>
      <div className="m-5 float-left w-[60%]">
        <div className="mb-4 flex gap-24">
          <input
            type="search"
            value="YOUTUBE VIDEO LINK"
            className="bg-amber-300 w-1/3 rounded-xl pl-4"
          />

          <button className="bg-blue-300 p-4 rounded-xl w-32">Enter</button>
        </div>
        <h1 className="text-2xl font-mono">YOUTUBE VIDEO TITLE</h1>
        <div className="h-125 w-full mt-5 bg-green-300 flex items-center justify-center">
          YOUTUBE VIDEO
        </div>
      </div>
      <div className="float-right w-[30%] mr-8 h-full mt-5">
        <div className="h-68 w-full bg-red-500">
          <p>User 1 has joined the room!</p>
        </div>
        <div className="h-64 w-full bg-pink-300 mt-24">
          <p>WATCH HISTORY</p>
        </div>
      </div>
    </>
  );
}
