import React, { useState, useEffect } from "react";

import ListingCard from "../components/ListingCard";
import AddListingButton from "../components/AddListingButton";

function ListingsPage() {
  return (

    <div className="container-fluid text-center">
			<div className="row justify-content-center">
        <AddListingButton/>
        <ListingCard />
        <ListingCard />
      </div>
    </div>
  );
}

export default ListingsPage;