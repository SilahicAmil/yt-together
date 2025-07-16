# 🎯 MVP: Synchronized Play/Pause via WebSocket

---

## ✅ 1. Room Creation

~~HTTP `POST /newRoom`~~

- Generate unique `roomID`
- Store room in memory with:
  - `roomID`
  - list of active WebSocket connections

---

## ✅ 2. Joining a Room

- HTTP `GET /ws/:roomID`
- Validate that `roomID` exists
- Upgrade HTTP request to WebSocket
- Add WebSocket connection to room’s list
- Start a goroutine to handle player events per connection

---

## ✅ 3. Handling Player Events (Server Side)

- Listen for JSON messages from WebSocket connection
  - Event types: `play`, `pause`
- On message received:
  - Broadcast the same message to all other WebSocket clients in the same room
  - Exclude sender from broadcast if desired

---

## ✅ 4. Frontend Responsibilities

- Connect to WebSocket using `roomID` when joining
- Send JSON messages when user presses:
  - Play → `{ type: "play" }`
  - Pause → `{ type: "pause" }`
- Listen for incoming messages:
  - Trigger play/pause on local video player accordingly

---

## ✅ 5. Room Management

- Use in-memory map to manage rooms and connections
- Remove WebSocket from room list on disconnect
- Optionally delete room if no users remain

---

## 🧪 MVP Test Flow

1. User A creates a room → receives `roomID`
2. User A opens room page → connects via WebSocket
3. User B joins the same `roomID` → connects via WebSocket
4. User A presses "pause" → User B's player pauses via WebSocket event
5. User B presses "play" → User A's player plays

---

## 🛠 Optional (Post-MVP)

- Include video timestamp in events
- Sync seek events
- User identity or nickname in messages
- Room persistence via database
- Auto-expire inactive rooms
