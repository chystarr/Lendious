import React, { useState, useEffect } from "react";

import ListingCard from "../components/ListingCard";

function BorrowItem(props) {
  return (
    <a href="HomePage.js">
    <button onClick={props.onClick}>
      Lend It
    </button></a>
  );
}

function LendOut(props) {
  return (
    <button onClick={props.onClick}>
      Lend Out Item
    </button>
  );
}



function ListingsPage() {
  return (
    <div>
      <p>This is the Listings page</p>
      <p>You can view all the items that are available to borrow in your building here</p>
      <p>Also, there will be a link to lend a new item</p>
      <ListingCard />
      <ListingCard />
    
    </div>
  );
}


export default ListingsPage;