import { useEffect, useState } from 'react';
import Message from "./Message.js";

const Messages = ({ socket, listing_id }) => {
  const [messages, setMessages] = useState([]);
  const [name, setName] = useState("");

  useEffect(() => {
    async function getData () {
      try {
        let nameResponse = await fetch("/api/users/name");
        let senderName = await nameResponse.json();
        setName(senderName);
      } catch (error) {
        console.error("Error identifying sender", error);
      }
    }
    
      getData();

    return () => {
    };
  }, []);

  useEffect(() => {
    // retrieve all past messages for this chatroom upon entering
    const getPastMessages = async () => {
      try {
        let response = await fetch("/api/messages/" + listing_id);
        let pastMessages = await response.json();
        console.log(pastMessages);
  
        if (response.ok) {
          console.log("Retreiving past messages");
          setMessages(pastMessages);

          // send each of the past messages to the server
          messages.forEach(message => {
            console.log(message);
            socket.emit("send", {
              sender_name: name,
              message_content: message.message_content
            });
          })
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
    <div className="row">
      {messages.map((message, index) => (
        <Message key={index} message={message} />
      ))}
    </div>
  );
};

export default Messages;