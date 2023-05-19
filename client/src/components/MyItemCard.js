import React, {useState} from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChessBoard, faBook, faToolbox } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import EditListingButton from "../components/EditListingButton";
import AddImageButton from "../components/AddImageButton";
import DeleteListingButton from "./DeleteListingButton";
import StopBorrowingButton from "./StopBorrowingButton";
import {useAuth} from "../context/AuthContext"

function MyItemCard(props) {
  const userContext = useAuth();
  // !!!!!!!
  // TODO: make an imageButton variable that gets set to either AddImageButton or EditImageButton
  // (or do add/remove instead?)

  // active item card
  if (props.lender_id && props.borrower_id) {
    if (props.lender_id === userContext.user.user_id) {
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
                            <button className="btn btn-primary" type="button" data-bs-toggle="collapse" data-bs-target={"#" + props.listing_id} aria-expanded="false" aria-controls="collapseExample">⌄</button>
                          </div>
                        </div>
                    </div>
                </div>
                <div className="collapse" id={""+props.listing_id}>
                  <div className="card card-body mt-1">
                    <p className="card-text">{props.item_description}</p>
                  </div>
                  <div className="row">
                    <div className="col d-flex justify-content-center">
                      <Link to={"/chat/" + props.listing_id}>
                        <button type="button" className="btn btn-primary mx-auto mt-3"> Chat </button>
                      </Link>
                    </div>
                    <div className="col">
                      <button className="btn btn-primary mt-3">Report an issue</button>
                    </div>
                </div>  
                </div>
              </div>
            </div>
        </div>
      );
    } else if (props.borrower_id === userContext.user.user_id) {
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
                            <button className="btn btn-primary" type="button" data-bs-toggle="collapse" data-bs-target={"#" + props.listing_id} aria-expanded="false" aria-controls="collapseExample">⌄</button>
                          </div>
                        </div>
                    </div>
                </div>
                <div className="collapse" id={""+props.listing_id}>
                  <div className="card card-body mt-1">
                    <p className="card-text">{props.item_description}</p>
                  </div>
                  <div className="row">
                    <div className="col d-flex justify-content-center">
                      <Link to={"/chat/" + props.listing_id}>
                        <button type="button" className="btn btn-primary mx-auto mt-3"> Chat </button>
                      </Link>
                    </div>
                    <div className="col d-flex justify-content-center">
                      <StopBorrowingButton listing_id={props.listing_id}/>
                    </div>
                    <div className="col">
                      <button className="btn btn-primary mt-3">Report an issue</button>
                    </div>
                  </div>  
                </div>
              </div>
            </div>
        </div>
      );
    }
  }
  // passive item card
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
                        <button className="btn btn-primary" type="button" data-bs-toggle="collapse" data-bs-target={"#" + props.listing_id} aria-expanded="false" aria-controls="collapseExample">⌄</button>
                      </div>
                    </div>
                </div>
            </div>
            <div className="collapse" id={""+props.listing_id}>
              <div className="card card-body mt-1">
                <div className="row">
                  <p className="card-text">{props.item_description}</p>
                </div>
              </div>
              <div className="row">
                  <div className="col d-flex justify-content-center">
                    <EditListingButton listing_id={props.listing_id}/>
                  </div>
                  <div className="col d-flex justify-content-center">
                    <AddImageButton listing_id={props.listing_id}/>
                  </div>
                  <div className="col">
                    <button className="btn btn-primary mt-3">Report an issue</button>
                  </div>
                  <div className="col d-flex justify-content-center">
                    <DeleteListingButton listing_id={props.listing_id}/>
                  </div>   
              </div>  
            </div>
          </div>
        </div>
    </div>
  );
}

export default MyItemCard;