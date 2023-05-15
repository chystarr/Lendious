import { useEffect, useState } from 'react';
import Message from "./Message.js";

const Messages = ({ socket, listing_id }) => {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    // retrieve all past messages for this chatroom upon entering
    const getPastMessages = async () => {
      try {
        let response = await fetch("/api/messages/" + listing_id);
        let pastMessages = await response.json();
        console.log(pastMessages);
  
        if (response.ok) {
          console.log("Retreived past messages");
          setMessages(pastMessages);
        }
  
      } catch(error) {
        console.error("Past messages couldn't be retrieved", error);
      }
    };

    getPastMessages();

    return () => {
    };
  }, []);

  // updates the messages displayed whenever the client receives an "msg" event emitted by the server
  useEffect(() => {
    socket.on("msg", (msgInfo) => {
      setMessages(messages => [...messages, msgInfo]);
    });

    return () => socket.off("msg");
  }, [socket]);

  return (
    <div>
        {messages.map((message, index) => (
          <Message key={index} content={message.message_content} />
        ))}
    </div>
  );
};

export default Messages;