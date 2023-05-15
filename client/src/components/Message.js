import { useState, useEffect } from 'react';

const Message = ({ message }) => {
  /*
  const [name, setName] = useState("");

  useEffect(() => {
    async function getData () {
      try {
        let nameResponse = await fetch("/api/users/" + message.sender_id + "/name");
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
  }, []);
  
  
  if (message.sender_id) {
    // message was loaded from the database
    return (
      <div className="w-60 border p-3 m-3">
        <div className="row">
          <div className="col">{name}</div>
          <div className="col-9"></div>
          <div className="col">time</div>
        </div>
        <br />
        <div className="row">
          <p>{message.message_content}</p>
        </div>
      </div>
    )
  }
  */
  

  return (
    <div id="message" className="card border-dark w-60 p-3 m-3">
      <div className="row">
        <div className="col">{message.sender_name || "Name"}</div>
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