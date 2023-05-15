import React, {useState} from 'react'

function DeleteListingButton({listing_id}) {

  const [error, setError] = useState(false);

  const handleClick = async (event) => {
    event.preventDefault();
    try {
      let response = await fetch("/api/listings/" + listing_id, {
        method: "DELETE",
        credentials: "include",
      });

      if (!response.ok) {
        setError(true);
      } else {
        // Reload the page
        window.location.reload();
      }

    } catch (error) {
      console.log("error deleting a listing");
    }
    
  }

  return (
    <div className="col-10 col-md-8 col-lg-7 mt-3">
        <button type="button" onClick={handleClick} className="btn btn-primary mx-auto"> Delete </button>
    </div>
  );
};

export default DeleteListingButton;