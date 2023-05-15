const Messages = ({ content }) => {
  return (
    <div className="w-60 border p-3 m-3">
      <div className="row">
        <div className="col">name</div>
        <div className="col-9"></div>
        <div className="col">time</div>
      </div>
      <br />
      <div className="row">
        <p>{content}</p>
      </div>
    </div>
  );
};

export default Messages;