import React, { useState, useEffect } from "react";
import LoadingSpinner from "../components/LoadingSpinner";
import ErrorAlert from "../components/ErrorAlert";
import MyItemCard from "../components/MyItemCard";
import SearchBar from "../components/SearchBar";

function MyItemsPage() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [listings, setListings] = useState([]);
  const [borrowedListings, setBorrowedListings] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [borrowedSearchResults, setBorrowedSearchResults] = useState([]);
  
  useEffect(() => {
    async function getData() {
      setLoading(true);
      try {
        let response = await fetch("/api/auth/login");
        let user = await response.json();
        getPersonalListings(user.user_id);
        getBorrowedListings();
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

  async function getBorrowedListings()
  {
    try {
      let response = await fetch("/api/listings/borrowing");
      console.log("getting the user's borrowed listings:")
      console.log(response);
      let userListings = await response.json();
      setBorrowedListings(userListings);
      setBorrowedSearchResults(userListings);
      setLoading(false);
    } catch (error) {
        console.log("Error getting user listings after completing user id fetch");
        setError(true);
    }
  }

  if(error) return <ErrorAlert details="Failed to fetch user listings" />;
  if(loading) return <LoadingSpinner/>

  const results = searchResults.map((listing) => {
      return <MyItemCard {...listing} key = {listing.listing_id} />
  })
  const borrowedResults = borrowedSearchResults.map((listing) => {
    return <MyItemCard {...listing} key = {listing.listing_id} />
})

 const content = results?.length ? results : <p className="mt-3">No Listings</p>
 const borrowedContent = borrowedResults?.length ? borrowedResults : <p className="mt-3">No Listings</p>

  return (
    <div className="container-fluid text-center">
			<div className="row justify-content-center">
        <h3>Items I'm Lending</h3>
        <SearchBar listings={listings} setSearchResults={setSearchResults}/>
        {content}
        <h3>Items I'm Borrowing</h3>
        <SearchBar listings={borrowedListings} setSearchResults={setBorrowedSearchResults}/>
        {borrowedContent}
      </div>
    </div>
  );
}

export default MyItemsPage;