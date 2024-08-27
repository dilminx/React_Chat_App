import React, { useState } from "react";
import "./App.css";
import io from "socket.io-client";
import Chat from "./Chat";

const socket = io.connect("https://react-chat-app-server-rust.vercel.app");
// http://localhost:3001
const App = () => {
  const [userName, setUserName] = useState("");
  const [room, setRoom] = useState("");
  const joinRoom = () => {
    if (userName !== "" && room !== "") {
      socket.emit("join_room",room)
    }
  }
  return (
    <div>
      <h3>join chat</h3>
      <input
        type="text"
        placeholder="Name..."
        onChange={(e) => {
          setUserName(e.target.value);
        }}
      ></input>
      <input
        type="text"
        placeholder="Room..."
        onChange={(e) => {
          setRoom(e.target.value);
        }}
      ></input>
      <button onClick={joinRoom}>click</button>
      <Chat socket={socket } userName={userName} room={room} />
    </div>
  );
};

export default App;
