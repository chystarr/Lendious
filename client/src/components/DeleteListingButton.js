import React from 'react'
import { Link } from "react-router-dom";

function DeleteListingButton({listing_id}) {
  const handleClick = async (event) => {
    event.preventDefault();
    let response = await fetch("/api/listings/" + listing_id, {
      method: "DELETE",
      credentials: "include",
    });
  }

  return (
    <div className="col-10 col-md-8 col-lg-7">
      <div className="card mb-4 shadow">
        <button type="button" onClick={handleClick} className="btn btn-primary mx-auto"> Delete </button>
      </div>
    </div>
  );
};

export default DeleteListingButton;