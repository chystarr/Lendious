import React, {useState} from 'react'

function StopBorrowingButton({listing_id}) {
  return (
    <div className="col-10 col-md-8 col-lg-7 mt-3">
        <button type="button" className="btn btn-primary mx-auto"> Stop Borrowing </button>
    </div>
  );
};

export default StopBorrowingButton;