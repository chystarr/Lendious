import React, { useState, useEffect } from "react";
import LoadingSpinner from "../components/LoadingSpinner";
import ErrorAlert from "../components/ErrorAlert";
import ListingCard from "../components/ListingCard";
import AddListingButton from "../components/AddListingButton";
import SearchBar from "../components/SearchBar";
import {useAuth} from "../context/AuthContext"

function ListingsPage() {

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [listings, setListings] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [b_id, setB_id] = useState(0);
  const userContext = useAuth();
  
  useEffect(() => {
    async function getData() {
      setLoading(true);
      try {
        let response = await fetch("/api/buildings/my-building");
        console.log("getting the user building id in listingsPage:")
        console.log(response);
        let bid = await response.json();
        if(response.ok)
        {
          setB_id(bid);
          getListings(bid);
        }
      } catch (error) {
          console.log("Error getting user building id when displaying listings");
          setError(true);
      }
    }

    getData();

    return () => {
    };
  }, []);

  async function getListings(bid)
      {
        try {
          let response = await fetch("/api/buildings/" + bid);
          if(response.ok)
          {
            let allListings = await response.json();
            if(response.ok)
            {
              setListings(allListings);
              setSearchResults(allListings);
              setLoading(false);
            }
          } else {
            console.log("made call, but response not ok:");
            console.log(response);
          }
          

        } catch (error){
          console.log("Error fetching building/" + b_id, error);
          setError(true);
        }
    }

  if(error) return <ErrorAlert details="Failed to fetch building listings" />;
  if(loading) return <LoadingSpinner/>;

  const filteredListings = searchResults.filter((listing) => listing.lender_id !== userContext.user.user_id) 
  const completeFilteredListings = filteredListings.filter((listing) => listing.borrower_id === null);
  const results = completeFilteredListings.map((listing) => {
     return <ListingCard {...listing} key = {listing.listing_id} />
  })

  const content = results?.length ? results : <p className="mt-3">No Listings</p>
  
  return (
    <div className="container-fluid text-center">
			<div className="row justify-content-center">
        <AddListingButton building_id={b_id}/>
        <SearchBar listings={listings} setSearchResults={setSearchResults}/>
        {content}
      </div>
    </div>
  );
}

export default ListingsPage;