import React, {useState} from 'react'
import { Navigate } from "react-router-dom";
import { Link } from "react-router-dom";
import LoadingSpinner from './LoadingSpinner';

function JoinBuildingButton({id, name}) {

    const [userId, setUserId] = useState("");
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState(false);

    {
        //make backend post call to get user id here
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
            joinBuilding(user.user_id);
        } catch (error) {
            console.log("Error getting user id when joining building");
            setError(true);
        }
    };

    async function joinBuilding(userID)
    {
        if(userId) userID = userId;
        try {
            let response = await fetch("/api/buildings/" + id +"/join", {
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
  
    return (
        <div className="row">
            <div className="col">
               
                <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target={"#" + id}>
                Join
                </button>

                
                <div class="modal fade" id={"" + id} tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div class="modal-dialog">
                    <div class="modal-content">
                    <div class="modal-header">
                        <h1 class="modal-title fs-5" id="exampleModalLabel">Confirmation</h1>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <p>
                            You are about to join "<span className="text-primary">{name}</span>". 
                        </p>
                        <p>
                            If this is your apartment complex, please click <span className="text-primary">"join"</span>
                        </p>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                        <button type="button" onClick={handleSubmit} class="btn btn-primary" data-bs-dismiss="modal">Join</button>
                    </div>
                    </div>
                </div>
                </div>


            </div>
        </div>
  );
}

export default JoinBuildingButton;