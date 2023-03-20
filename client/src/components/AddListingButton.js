import React from 'react'
import { Link } from "react-router-dom";

function AddListingButton() {
  return (
    <div className="col-10 col-md-8 col-lg-7">
      <div className="card mb-4 shadow">
        <Link to={"/form/new"}>
            <button type="button" className="btn btn-primary btn-block w-100"> Create New Listing </button>
        </Link>
      </div>
    </div>
  );
}

export default AddListingButton;