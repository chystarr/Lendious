import React, { useState, useEffect } from "react";
import LoadingSpinner from "../components/LoadingSpinner";
import ErrorAlert from "../components/ErrorAlert";
import ListingCard from "../components/ListingCard";
import SearchBar from "../components/SearchBar";

function MyItemsPage() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [listings, setListings] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  
  useEffect(() => {
    async function getData() {
      setLoading(true);
      try {
        let response = await fetch("/api/auth/login");
        let user = await response.json();
        getPersonalListings(user.user_id);
      } catch (error){
        console.log("Error fetching user inside myitems page");
        setError(true);
      }
    }

    getData();

    return () => {
      //clean up function
    };
  }, []);

  async function getPersonalListings(user_id)
  {
    try {
      let response = await fetch("/api/listings/my-listings");
      console.log("getting the users listings:")
      console.log(response);
      let userListings = await response.json();
      setListings(userListings);
      setSearchResults(userListings);
      setLoading(false);
    } catch (error) {
        console.log("Error getting user listings after completing user id fetch");
        setError(true);
    }
  }

  if(error) return <ErrorAlert details="Failed to fetch user listings" />;
  if(loading) return <LoadingSpinner/>

  const results = searchResults.map((listing) => {
      return <ListingCard {...listing} key = {listing.listing_id} />
  })

 const content = results?.length ? results : <p className="mt-3">No Listings</p>

  return (
    <div className="container-fluid text-center">
			<div className="row justify-content-center">
        <SearchBar listings={listings} setSearchResults={setSearchResults}/>
        {content}
      </div>
    </div>
  );
}

export default MyItemsPage;