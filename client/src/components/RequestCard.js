import React, {useState} from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrashCan } from "@fortawesome/free-solid-svg-icons";
import {useAuth} from "../context/AuthContext"

function RequestCard(props) {
  const auth = useAuth();
  const [error, setError] = useState(false);

  const handleClick = async (event) => {
    event.preventDefault();

    try {
      let response = await fetch("/api/requests/" + props.id, {
        method: "DELETE",
        credentials: "include"
      });

      if (!response.ok) {
        setError(true);
      } else {
        // Reload the page
        window.location.reload();
      }
      
    } catch (error) {
      console.error("Server error when deleting request", error);
    }

  }

  return (
    <div className="col-10 col-md-8 col-lg-7 mt-3">
        <div className="row card shadow">
          <div className="card-body">

              {props.requester_id === auth.user.user_id ?
                <div className="row">
                  <div className="col"> 
                    <h3 className="">{props.item_requested}</h3> 
                  </div>
                  <div className="col-2">
                    <button className="btn btn-primary"><FontAwesomeIcon icon={faTrashCan}  onClick={handleClick}/></button>
                  </div>
                </div> 
                : 
                <div className="row">
                  <div className="col"> 
                    <h3 className="">{props.item_requested}</h3> 
                  </div>
                  <div className="col-2">
                    <></>
                  </div>
                </div> 
              }
            <div className="row">
              <div className="col">
                <p>{props.content}</p>
              </div>
              <div className="col-2">
                <></>
              </div>
            </div>
          </div>
        </div>
    </div>
  );
}

export default RequestCard;