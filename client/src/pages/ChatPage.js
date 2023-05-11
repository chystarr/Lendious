import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Messages from "../components/Messages.js";

// Socket.IO setup (based on documentation)
import { io } from "socket.io-client";
const socket = io.connect('http://localhost:4000');

//const ChatPage = ({ socket }) => {
const ChatPage = () => {
  let params = useParams();
  
  useEffect(() => {
    console.log(socket);

    const room = params.listing_id;
    
    // emit event that will be received by server
    socket.emit("join", room);
  
    socket.on("connect", () => {
      console.log(socket.connected);
      console.log("hi");
    });
  }, []);
  
  return (
    <div>
      <p>Chat page</p>
      <Messages socket={socket} />
    </div>
  );
};

export default ChatPage;