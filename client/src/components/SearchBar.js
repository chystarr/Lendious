import React from "react";

function SearchBar() {
    return(
        <div className="col-10 col-md-8 col-lg-7">
            <div className="input-group rounded">
                <input type="search" className="form-control rounded" placeholder="Search" aria-label="Search" aria-describedby="search-addon" />
            </div>
        </div>
    )
}

export default SearchBar;