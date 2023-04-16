import React, {useState} from 'react'
import { Navigate } from "react-router-dom";
import { Link } from "react-router-dom";
import LoadingSpinner from './LoadingSpinner';

function AddBuildingButton({size}) {

    const [bName, setBName] = useState("");
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState(false);
    const [buildingId, setBuildingId] = useState(0);
    const [userId, setUserId] = useState("");
    const [loading, setLoading] = useState(false);

    const handleChange = (event) => {
        setBName(event.target.value);
        setBuildingId(size + 1);
    } 

    {
        //make backend post call to add building here
    }
    const handleSubmit = async (event) => {
        event.preventDefault();
        setLoading(true);
        try {
            let response = await fetch("/api/auth/login");
            console.log("getting the user from get login request:")
            console.log(response);
            let user = await response.json();
            setUserId(user.user_id);
            postBuilding();
        } catch (error) {
            console.log("Error getting user id when joining building");
            setError(true);
        }
      };
      
      async function postBuilding()
      {
        try {
          let response = await fetch("/api/buildings", {
            method: "POST",
            credentials: "include",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              building_id: buildingId,
              name: bName,
            }),
          });
    
          if (response.ok) {
            joinBuilding(userId);
          } else {
            setError(true);
          }
        } catch (error) {
          console.error("Server error while creating a new micro post", error);
          setError(true);
        }
      }

      async function joinBuilding(userID)
      {
          if(userId) userID = userId;
          try {
              let response = await fetch("/api/buildings/" + buildingId +"/join", {
                method: "POST",
                credentials: "include",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({
                  userId: userID
                }),
              });
        
              if (response.ok) {
                setSuccess(true);
              } else {
                setError(true);
              }
            } catch (error) {
              console.error("Server error while joining building after getting user id", error);
              setError(true);
            }   
      };

      if (success) return <Navigate to="/listings" />;
      if (loading) return <LoadingSpinner/>;
    return (
        <div className="row">
            <div className="col">
               
                <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
                Add Building
                </button>

                
                <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div class="modal-dialog">
                    <div class="modal-content">
                    <div class="modal-header">
                        <h1 class="modal-title fs-5" id="exampleModalLabel">Building Name</h1>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <input 
                        type="text" 
                        className="form-control rounded" 
                        placeholder= "Building Name" 
                        aria-label="Search" 
                        onChange={handleChange}
                        />
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                        <button type="button" onClick={handleSubmit} class="btn btn-primary" data-bs-dismiss="modal">Save</button>
                    </div>
                    </div>
                </div>
                </div>


            </div>
        </div>
  );
}

export default AddBuildingButton;