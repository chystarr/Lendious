import React from "react";

function RequestCard(props) {
  return (
    <div className="col-10 col-md-8 col-lg-7 mt-3">
        <div className="row card shadow">
          <div className="card-body">
            <div className="col">
                <p>{props.content}</p>
            </div>
          </div>
        </div>
    </div>
  );
}

export default RequestCard;