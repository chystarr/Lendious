import React, {useState} from 'react'
import { Navigate } from "react-router-dom";
import { Link } from "react-router-dom";

function AddBuildingButton({size}) {

    const [bName, setBName] = useState("");
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState(false);

    const handleChange = (event) => {
        setBName(event.target.value);
    } 

    {
        //make backend post call to add building here
    }
    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
          let response = await fetch("/api/buildings", {
            method: "POST",
            credentials: "include",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              building_id: size + 1,
              name: bName,
            }),
          });
    
          if (response.ok) {
            setSuccess(true);
          } else {
            setError(true);
          }
        } catch (error) {
          console.error("Server error while creating a new micro post", error);
          setError(true);
        }
      };
  
      if (success) return <Navigate to="/listings" />;
  
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