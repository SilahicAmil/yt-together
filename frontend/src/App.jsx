import { Link, useNavigate } from "react-router";

export default function App() {
  const navigate = useNavigate();
  async function createRoom() {
    // Make request to backend to create room
    // Return unique room id and redirect
    // const res = await fetch("/backend/createRoom");
    // const json = await res.json();
    // return json;
    // for now just do this hardcoded

    navigate(`/room/${crypto.randomUUID()}`);
  }

  return (
    <div>
      <h1>Hello world</h1>
      <p>Testing 123</p>
      <button onClick={createRoom}>Create Room</button>
    </div>
  );
}
