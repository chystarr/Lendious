import { useEffect, useState } from 'react';

const Messages = ({ socket }) => {
  const [messages, setMessages] = useState([]);

  // updates the messages displayed whenever the client receives an "msg" event emitted by the server
  useEffect(() => {
    socket.on("msg", (msgInfo) => {
      console.log(msgInfo);
      setMessages(messages => [...messages, msgInfo]);
    });

    return () => socket.off("msg");
  }, [socket]);

  return (
    <div>
      <ul>
        {messages.map((message, index) => (
          <li key={index}>{message.text}</li>
        ))}
      </ul>
    </div>
  );
};

export default Messages;