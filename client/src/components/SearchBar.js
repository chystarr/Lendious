/*
// Citation: https://youtu.be/ZoayCCDHFiI?t=663
// The reason why I chose this particular implementation of the search bar over others 
// in my reading and research is that its implementation went against my assumption 
// of having to use Reacts {useState, useEffect } functionalities. 
// This implementation uses an array of data passed to it as well as a setter function, 
// which never came to my mind as a possible implementation. 
// The filtering/search features have been changed to match what we needed for the app.  
*/


import React from "react";


const SearchBar = ({listings, setSearchResults, flag}) => {


    const handleSearchChange = (e) => {
        const searchValue = e.target.value.toLowerCase();
      
        if (!searchValue) {
          setSearchResults(listings);
          return;
        }
      
        let results = [];
      
        if (flag) {
          results = listings.filter(listing => listing.name.toLowerCase().includes(searchValue));
          setSearchResults(results);
        } else {
          if (searchValue.includes("book")) {
            results = listings.filter(listing => listing.item_type_id === 3);
          } else if (searchValue.includes("tool")) {
            results = listings.filter(listing => listing.item_type_id === 1);
          } else if (searchValue.includes("game")) {
            results = listings.filter(listing => listing.item_type_id === 2);
          } else {
            results = listings.filter(listing =>
              listing.name.toLowerCase().includes(searchValue) ||
              listing.condition.toLowerCase().includes(searchValue) ||
              listing.range_start.toLowerCase().includes(searchValue) ||
              listing.range_end.toLowerCase().includes(searchValue)
            );
          }
      
          setSearchResults(results);
        }
      }
    return(
        <div className="col-10 col-md-8 col-lg-7">
            <div className="input-group rounded">
                <input 
                    type="search" 
                    className="form-control rounded" 
                    placeholder="Search" 
                    aria-label="Search" 
                    onChange={handleSearchChange}
                />
            </div>
        </div>
    )
}

export default SearchBar;