const MessageInput = ({ socket }) => {
  function handleSubmit(e) {
    // form submit handling referenced from React documentation
    e.preventDefault();
    const form = e.target;
    const msgData = new FormData(form);
    const msgJson = Object.fromEntries(msgData.entries());
    console.log(msgJson);

    socket.emit("send", {
      text: msgJson.msgInput
    });
  }

  return (
    <div>
      <ul>
        <form onSubmit={handleSubmit}>
          <input name="msgInput" />
          <button type="submit">Send</button>
        </form>
      </ul>
    </div>
  );
};

export default MessageInput;