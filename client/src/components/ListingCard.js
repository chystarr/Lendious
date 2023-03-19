import React from "react";

function ListingCard(props) {
  return (
    <div className="col-10 col-md-8 col-lg-7">
        <div className="card">
          <div className="card-body">
            <h5 class="card-title">{props.name}</h5>
            <h6 class="card-subtitle mb-2 text-muted">{props.range_start.substring(0,10)} - {props.range_end.substring(0,10)}</h6>
            <p class="card-text">{props.item_description}</p>
          </div>
        </div>
    </div>
  );
}

export default ListingCard;