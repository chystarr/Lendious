import React, {useState} from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChessBoard, faBook, faToolbox } from "@fortawesome/free-solid-svg-icons";

function ListingCard(props) {
  const [error, setError] = useState(false);

  const handleClick = async (event) => {
    event.preventDefault();
    try{
      let response = await fetch("/api/listings/" + props.listing_id + "/borrow", {
        method:"PATCH",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        }
      });

      if (!response.ok) {
        setError(true);
      }

    } catch(error){
      console.error("Server error when borrowing item", error);
      setError(true);
    }
  };

  return (
    <div className="col-10 col-md-8 col-lg-7 mt-3">
        <div className="card shadow">
          <div className="card-body">
            <div className="row">
                <div className="col">
                    <div className="row">
                      {/*name*/}
                      <h5 class="card-title">{props.name}</h5>
                    </div>
                    <div className="row">
                      {/*date ranges*/}
                      <h6 class="card-subtitle mb-2 text-muted ps-0">{props.range_start.substring(0,10)} - {props.range_end.substring(0,10)}</h6>
                    </div>
                    <div className="row">
                      {/*condition*/}
                      <h6 class="card-subtitle mb-2 text-muted ps-0">Condition: {props.condition}</h6>
                    </div>
                </div>
                <div className="col">
                    <div className="row">
                      {/*icon*/}
                      {props.item_type_id === 1 ? <FontAwesomeIcon icon={faToolbox} className="fa-5x"/> : <></>}
                      {props.item_type_id === 2 ? <FontAwesomeIcon icon={faChessBoard} className="fa-5x"/> : <></>}
                      {props.item_type_id === 3 ? <FontAwesomeIcon icon={faBook} className="fa-5x"/> : <></>}
                    </div>
                    <div className="row justify-content-between">
                      {/*dropdown button*/}
                      <div className="col"></div>
                      <div className="col-4">
                        <button className="btn btn-primary" type="button" data-bs-toggle="collapse" 
                        data-bs-target={"#" + props.listing_id} aria-expanded="false" aria-controls="collapseExample">⌄</button>
                      </div>
                    </div>
                </div>
            </div>
            <div className="collapse" id={""+props.listing_id}>
              <div className="card card-body mt-1">
                <p className="card-text">{props.item_description}</p>
              </div>
              <button className="btn btn-primary mt-3" onClick={handleClick}>Borrow</button>
            </div>
          </div>
        </div>
    </div>
  );
}

export default ListingCard;