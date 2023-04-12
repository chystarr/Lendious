import React, { useState, useEffect } from "react";
import LoadingSpinner from "../components/LoadingSpinner";
import ErrorAlert from "../components/ErrorAlert";
import ListingCard from "../components/ListingCard";
import AddListingButton from "../components/AddListingButton";
import SearchBar from "../components/SearchBar";

function ListingsPage() {

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [listings, setListings] = useState([]);
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    async function getData() {
      setLoading(true);
      try {
        let response = await fetch("/api/listings");
        let allListings = await response.json();
        setListings(allListings);
        setSearchResults(allListings);
        setLoading(false);

      } catch (error){
        console.log("Error fetching listings");
        setError(true);
      }
    }

    getData();

    return () => {
      //clean up function
    };
  }, []);

  if(error) return <ErrorAlert details="Failed to fetch all listings" />;
  if(loading) return <LoadingSpinner/>;

  const results = searchResults.map((listing) => {
     return <ListingCard {...listing} key = {listing.id} />
  })

  const content = results?.length ? results : <p className="mt-3">No Matching Listings</p>
  
  return (
    <div className="container-fluid text-center">
			<div className="row justify-content-center">
        <AddListingButton/>
        <SearchBar listings={listings} setSearchResults={setSearchResults}/>
        {content}
      </div>
    </div>
  );
}

export default ListingsPage;