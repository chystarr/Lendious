import React, { useState, useEffect } from "react";
import LoadingSpinner from "../components/LoadingSpinner";
import ErrorAlert from "../components/ErrorAlert";
import BuildingCard from "../components/BuildingCard";
import SearchBar from "../components/SearchBar";
import AddBuildingButton from "../components/AddBuildingButton";

function HomePage() {

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [buildings, setBuildings] = useState([]);
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    async function getData() {
      setLoading(true);
      try {
        let response = await fetch("/api/buildings");
        let allBuildings = await response.json();
        setBuildings(allBuildings);
        setSearchResults(allBuildings);
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

  if(error) return <ErrorAlert details="Failed to fetch all buildings" />;
  if(loading) return <LoadingSpinner/>;

  const results = searchResults.map((building) => {
     return <BuildingCard {...building} key = {building.building_id} />
  })

  const content = results?.length ? results : 
    <>
      <div className="row">
        <div className="col">
          <p className="mt-3">
            Don't see your apartment? No worries, you're the first one from your building to use Lendious. 
          </p>
          <p>
            <span className="text-primary"> Add</span> your building, tell others, and start lending.
          </p>
        </div>
      </div>
      <div className="row text-center">
        <div className="col">
          <AddBuildingButton size={buildings.length}/>
        </div>
      </div>
    </>
  
  return (
    <div className="container-fluid text-center">
			<div className="row justify-content-center">
        <p>
          Before you can <span className="text-primary">lend</span> find your apartment complex through the search bar.
        </p>
        <SearchBar listings={buildings} setSearchResults={setSearchResults}/>
        {content}
      </div>
    </div>
  );
}

export default HomePage;