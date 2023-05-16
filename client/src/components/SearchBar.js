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