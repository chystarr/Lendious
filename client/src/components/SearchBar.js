import React from "react";

const SearchBar = ({listings, setSearchResults}) => {

    const handleSearchChange = (e) => {
        if(!e.target.value) return setSearchResults(listings)

        const results = listings.filter(listing => listing.name.includes(e.target.value))

        setSearchResults(results);
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