import React, {useState} from 'react'

function StopBorrowingButton({listing_id}) {
  const [error, setError] = useState(false);

  const handleClick = async (event) => {
    event.preventDefault();
    try {
      let response = await fetch("/api/listings/" + listing_id + "/stop-borrowing", {
        method: "PATCH",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        }
      });

      if (!response.ok) {
        setError(true);
      } else {
        // Reload the page
        window.location.reload();
      }

    } catch (error) {
      console.log("Server error when user tried to stop borrowing an item");
    }
    
  }

  return (
    <div className="col-10 col-md-8 col-lg-7 mt-3">
      <button type="button" onClick={handleClick} className="btn btn-primary mx-auto"> Stop Borrowing </button>
    </div>
  );
};

export default StopBorrowingButton;