import React from 'react'
import { Link } from "react-router-dom";

function EditListingButton({listing_id}) {
  return (
    <div className="col-10 col-md-8 col-lg-7">
      <div className="card mb-4 shadow">
        <Link to={"/form/edit/"+listing_id}>
            <button type="button" className="btn btn-primary btn-block"> Edit </button>
        </Link>
      </div>
    </div>
  );
}

export default EditListingButton;