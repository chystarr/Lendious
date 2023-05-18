import React, { useState, useEffect } from "react";
import LoadingSpinner from "../components/LoadingSpinner";
import ErrorAlert from "../components/ErrorAlert";
import RequestCard from "../components/RequestCard";
import AddRequestButton from "../components/AddRequestButton";

function RequestsPage() {

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    async function getData() {
      setLoading(true);
      try {
        let response = await fetch("/api/requests");
        let allRequests = await response.json();
        setRequests(allRequests);
        setLoading(false);

      } catch (error){
        console.log("Error fetching requests");
        setError(true);
      }
    }

    getData();

    return () => {
      //clean up function
    };
  }, []);

  if(error) return <ErrorAlert details="Failed to fetch all requests" />;
  if(loading) return <LoadingSpinner/>;

  const results = requests.map((request) => {
     return <RequestCard {...request} key = {request.id} />
  })

  const content = results?.length ? results : 
    <>
      <div className="row">
        <div className="col">
          <p className="mt-3">
            No requests 
          </p>
        </div>
      </div>
    </>
  
  return (
    <div className="container-fluid text-center">
      <div className="row justify-content-center">
        <AddRequestButton/>
        {content}
      </div>
    </div>
  );
}

export default RequestsPage;