import { Link, useNavigate } from "react-router";

export default function App() {
  const navigate = useNavigate();

  async function createRoom() {
    const res = await fetch("/api/createRoom", {
      method: "POST",
    });
    const json = await res.json();

    console.log(json);

    navigate(`/room/${json.roomId}`);
  }

  return (
    <div>
      <h1>Hello world</h1>
      <p>Testing 123</p>
      <button onClick={createRoom}>Create Room</button>
    </div>
  );
}
