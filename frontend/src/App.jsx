import { Link, useNavigate } from "react-router";

export default function App() {
  const navigate = useNavigate();

  async function createRoom() {
    // Pop up modal to set Room Name (use some type of bad word filtering library or something)
    // Don't create room if modal is exited probably use some type of state or something for that

    const res = await fetch("/api/room/create", {
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
