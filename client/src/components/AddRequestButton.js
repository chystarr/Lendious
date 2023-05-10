import React, {useState} from 'react'
import LoadingSpinner from './LoadingSpinner';

function AddRequestButton() {

    const [success, setSuccess] = useState(false);
    const [error, setError] = useState(false);
    const [buildingId, setBuildingId] = useState(0);
    const [userId, setUserId] = useState("");
    const [loading, setLoading] = useState(false);
    const [request, setRequest] = useState("");

    const handleChange = (event) => {
        setRequest(event.target.value);
    } 

    {
        //make backend post call to add request here
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
            getBuildingID(user.user_id);
        } catch (error) {
            console.log("Error getting user id when making request");
            setError(true);
        }
      };
      
      async function getBuildingID(uID)
      {
        try {
            let response = await fetch("/api/buildings/my-building");
            console.log("getting the building id:")
            let bID = await response.json();
            setBuildingId(bID);
            postRequest(bID, uID)  
        } catch (error) {
            console.log("Error getting building id after user got");
            setError(true);
        }
      }

      async function postRequest(bID, uID)
      {
        try {
          let response = await fetch("/api/requests", {
            method: "POST",
            credentials: "include",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              building_id: bID, 
              content: request,
              requester_id: uID
            }),
          });
    
          if (response.ok) {
            setSuccess(true);
          } else {
            setError(true);
          }
        } catch (error) {
          console.error("Server error while creating a new request", error);
          setError(true);
        }
      }

      
      if (success) window.location.reload();
      if (loading) return <LoadingSpinner/>;
    return (
          <div className="row">
              <div className="col">
                  <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#requestModal">
                  Make a request
                  </button>

                  
                  <div class="modal fade" id="requestModal" tabindex="-1" aria-labelledby="requestModalLabel" aria-hidden="true">
                  <div class="modal-dialog">
                      <div class="modal-content">
                      <div class="modal-header">
                          <h1 class="modal-title fs-5" id="requestModalLabel">Request</h1>
                          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                      </div>
                      <div class="modal-body">
                          <textarea type="text-area" class="form-control rounded" onChange={handleChange}/>
                      </div>
                      <div class="modal-footer">
                          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                          <button type="button" onClick={handleSubmit} class="btn btn-primary" data-bs-dismiss="modal">Submit</button>
                      </div>
                      </div>
                  </div>
                  </div>


              </div>
          </div>
  );
}

export default AddRequestButton;