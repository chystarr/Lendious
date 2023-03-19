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

  useEffect(() => {
    async function getData() {
      setLoading(true);
      try {
        let response = await fetch("/api/listings");
        let allListings = await response.json();
        setListings(allListings);
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


  return (
    <div className="container-fluid text-center">
			<div className="row justify-content-center">
        <AddListingButton/>
        <SearchBar/>
        {console.log(listings)}
        {listings.map((listing) => {
          return <ListingCard {...listing} key = {listing.id} />
        })}
      </div>
    </div>
  );
}

export default ListingsPage;