import React from "react";

function BuildingCard(props) {
  return (
    <div className="col-10 col-md-8 col-lg-7 mt-3">
        <div className="row card shadow">
          <div className="card-body">
            <div className="col">
                <h1 class="card-title">{props.name}</h1>
            </div>
            <div className = "col">
                <button type="button" className="btn btn-primary">Join</button>
            </div>
          </div>
        </div>
    </div>
  );
}

export default BuildingCard;