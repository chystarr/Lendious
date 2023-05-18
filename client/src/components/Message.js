import { useState, useEffect } from 'react';

const Message = ({ message }) => {
  const [name, setName] = useState("");

  useEffect(() => {
    // If message.sender_id is truthy, then the message was a past message that was rendered upon
    // the user entering the chatroom
    if (message.sender_id) {
      async function getData () {
        try {
          let nameResponse = await fetch("/api/users/user/" + message.sender_id + "/name");
          let senderName = await nameResponse.json();
          setName(senderName);
        } catch (error) {
          console.error("Error identifying sender", error);
        }
      }

        if (message.sender_id) {
          getData();
        }

      return () => {
      };
    }
  }, []);
  
  console.log(message);

  return (
    <div id="message" className="card border-dark w-60 p-3 m-3">
      <div className="row">
        {/* If message.sender_name is truthy, then the message was sent by the server while the user was
        in the chatroom */}
        <div className="col">{message.sender_name || name}</div>
        <div className="col-9"></div>
        <div className="col"></div>
      </div>
      <br />
      <div className="row">
        <p>{message.message_content}</p>
      </div>
    </div>
  );
};

export default Message;