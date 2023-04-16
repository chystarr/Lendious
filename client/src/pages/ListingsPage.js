import React, { useState, useEffect } from "react";
import LoadingSpinner from "../components/LoadingSpinner";
import ErrorAlert from "../components/ErrorAlert";
import ListingCard from "../components/ListingCard";
import AddListingButton from "../components/AddListingButton";
import SearchBar from "../components/SearchBar";
import { useParams } from "react-router-dom";


function ListingsPage() {

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [listings, setListings] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  let params = useParams();
  
  useEffect(() => {
    async function getData() {
      setLoading(true);
      try {
        let response = await fetch("/api/buildings/" + params.id);
        if(response.ok)
        {
          let allListings = await response.json();
          setListings(allListings);
          setSearchResults(allListings);
          setLoading(false);
        } else {
          console.log("made call, but response not ok:");
          console.log(response);
        }
        

      } catch (error){
        console.log("Error fetching building/" + params.id, error);
        setError(true);
      }
    }

    getData();

    return () => {
      //clean up function
    };
  }, [params.id]);

  if(error) return <ErrorAlert details="Failed to fetch building listings" />;
  if(loading) return <LoadingSpinner/>;

  const results = searchResults.map((listing) => {
     return <ListingCard {...listing} key = {listing.listing_id} />
  })

  const content = results?.length ? results : <p className="mt-3">No Listings</p>
  
  return (
    <div className="container-fluid text-center">
			<div className="row justify-content-center">
        <AddListingButton building_id={params.id}/>
        <SearchBar listings={listings} setSearchResults={setSearchResults}/>
        {content}
      </div>
    </div>
  );
}

export default ListingsPage;