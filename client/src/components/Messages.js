import { useEffect, useState } from 'react';

const Messages = ({ socket }) => {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    socket.on("msg", (msgInfo) => {
      console.log(msgInfo);
      console.log(messages);
      //setMessages(messages.push(msgInfo));
      //setMessages(...messages, {text: msgInfo.message});
      // setMessages({messages:[...messages, {text: msgInfo.message}]})
      setMessages([...messages, msgInfo]);
      console.log(messages);
    });

    return () => socket.off("msg");
  }, [socket]);

  /*
  const messageItems = messages.map((message, index) => (
    <li key={index}>{message.text}</li>
  ));
  */

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