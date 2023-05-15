const MessageInput = ({ socket, listing_id }) => {
  const handleSubmit = async (e) => {
    // form submit handling referenced from React documentation
    e.preventDefault();
    const form = e.target;
    const msgData = new FormData(form);
    const msgJson = Object.fromEntries(msgData.entries());
    console.log(msgJson);

    try {
      let response = await fetch("/api/messages", {
        method:"POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(
          {
            "message_content": msgJson.msgInput,
            "listing_id": listing_id
          }
        ),
      });

      if (response.ok) {
        console.log("Message saved in database");
      }

    } catch(error) {
      console.error("Server error when saving message", error);
    }

    socket.emit("send", {
      message_content: msgJson.msgInput
    });
  };

  return (
    <div>
        <form onSubmit={handleSubmit}>
          <div className="input-group mb-3 fixed-bottom">
            <input type="text" className="form-control" name="msgInput" />
            <div className="input-group-append">
              <button className="btn btn-outline-secondary" type="submit">Send</button>
            </div>
          </div>
        </form>
    </div>
  );
};

export default MessageInput;