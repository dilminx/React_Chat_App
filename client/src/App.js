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
       <div>
      <h3 className="p-4 font-bold">Join chat</h3>
      <input className="p-1 m-1 border border-black"
        type="text"
        placeholder="Name..."
        onChange={(e) => {
          setUserName(e.target.value);
        }}
      ></input>
      <input className="p-1 m-1 border border-black"
        type="text"
        placeholder="Room..."
        onChange={(e) => {
          setRoom(e.target.value);
        }}
      ></input>
      <button className="w-16 p-1 m-1 bg-red-400 border rounded-lg shadow-xl" onClick={joinRoom}>click</button>
    </div>
      <Chat socket={socket } userName={userName} room={room} />
   </div>
  );
};

export default App;
