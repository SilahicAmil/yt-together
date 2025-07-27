import RoomPlayer from "../../components/room/room-player";
import { useParams } from "react-router";

export default function RoomDetails() {
  let { id } = useParams();

  return (
    <>
      <div className="flex justify-center items-center">
        <h1 className="text-4xl">YT Together</h1> {/* PENDING IDEA */}
      </div>
      <div className="m-5 lg:float-left lg:w-[60%]">
        <RoomPlayer id />
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
