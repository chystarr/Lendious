import React from 'react'
import { Link } from "react-router-dom";

function EditListingButton({listing_id}) {
  return (
    <div className="col-10 col-md-8 col-lg-7 mt-3">
        <Link to={"/form/edit/"+listing_id}>
            <button type="button" className="btn btn-primary mx-auto"> Edit </button>
        </Link>
    </div>
  );
}

export default EditListingButton;