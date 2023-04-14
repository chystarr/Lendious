import React from "react";


const SearchBar = ({listings, setSearchResults, flag}) => {


    const handleSearchChange = (e) => {
        if(!e.target.value) return setSearchResults(listings)

        let results = [];

        if(flag)
        {
            results = listings.filter(listing => listing.name.includes(e.target.value));
            setSearchResults(results)
        } else {
            if(e.target.value.includes("Book"))
            {
                results = listings.filter(listing => listing.item_type_id === 3)
            } else if (e.target.value.includes("Tool"))
            {
                results = listings.filter(listing => listing.item_type_id === 1)
            } else if (e.target.value.includes("Game"))
            {
                results = listings.filter(listing => listing.item_type_id === 2)  
            } else {
                results = listings.filter(listing => listing.name.includes(e.target.value) ||
                listing.condition.includes(e.target.value) || listing.range_start.includes (e.target.value)
                || listing.range_end.includes(e.target.value))  
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