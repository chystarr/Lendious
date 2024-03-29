import React, { useState, useEffect } from "react";
import { Navigate, useParams } from "react-router-dom";
import LoadingSpinner from "../components/LoadingSpinner";

function EditItemPage() {
  const [name, setName] = useState("");
  const [compensation, setCompensation] = useState(0);
  const [rstart, setRStart] = useState("");
  const [rend, setREnd] = useState("");
  const [condition, setCondition] = useState("");
  const [descr, setDescr] = useState("");
  const [itemTypeID, setItemTypeID] = useState(0);
  const [confirm, setConfirm] = useState("");
  const [loading, setLoading] = useState(false);
  
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);
  let params = useParams();
  console.log(params);

  const handleChange = (input) => e => {
    if (input === "name"){
      setName(e.target.value);
    } else if (input === "compensation") {
      setCompensation(Number(e.target.value));
    } else if (input === "rstart") {
      setRStart(e.target.value);
    } else if (input === "rend") {
      setREnd(e.target.value);
    } else if (input === "condition" && e.target.value !== "Choose...") {
      setCondition(e.target.value);
      console.log("condition: " + condition)
    } else if (input === "descr") {
      setDescr(e.target.value);
    } else if (input === "itype" && e.target.value !== "Choose...") {
      setItemTypeID(Number(e.target.value));
      console.log("itype id in state: " + itemTypeID);
    } else {
      setConfirm(e.target.value);
    }
  }


  {/*

  fetch request made does not match the specified
  console logs: /form/api/listings instead of just api/listings

*/}
  const handleSubmit = async(event) => {
    event.preventDefault();
    try{
      let response = await fetch("/api/listings/" + params.listing_id + "/edit", {
        method:"PATCH",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(
          {
            "name": name,
            "compensation" : compensation,
            "range_start": rstart,
            "range_end": rend,
            "condition" : condition,
            "item_description" : descr,
            "item_type_id" : itemTypeID
          }
        ),
      });

      if (response.ok) {
        setSuccess(true);
      } else {
        setError(true);
      }

    } catch(error){
      console.error("Server error when creating lending", error);
      setError(true);
    }

  };

  if (success) return <Navigate to={"/listings"} />;
  if (loading) return <LoadingSpinner/>;

  return (
    <div className="container-fluid text-center">
      {/*Name*/} 
      <div className="row justify-content-center"> 
        <div className="col text-start">
          <label for="name">Name</label>
          <input type="text" class="form-control" id="name" placeholder="Monopoly: Among Us Edition" onChange={handleChange("name")}/>
        </div>
  
        {/*Item Type*/}
        <div className="col-4 text-start">
          <label for="itype" className="text-start">Item Type</label>
          <select  name = "itype" id="itype" class="form-select" onChange={handleChange("itype")}>
            <option selected>Choose...</option>
            <option value = "1">Hardware/Tool</option>
            <option value ="2">Game</option>
            <option value="3">Book</option>
          </select>
        </div>
      </div>

      <div className="row">
        {/*Condition*/}
        <div className="col-4 text-start">
          <label for="condition" className="text-start">Condition</label>
          <select  name = "condition" id="condition" class="form-select" onChange={handleChange("condition")}>
            <option selected>Choose...</option>
            <option>Like new</option>
            <option>Very Good</option>
            <option>Good</option>
            <option>Acceptable</option>
          </select>
        </div>

        {/*Range Start*/}
        <div className="col-4 text-start">
          <label for="rstart" className="text-start">Lend Start</label>
          <input type="date" class="form-control" id="rstart" onChange={handleChange("rstart")}/>
        </div>

        {/*Range End*/}
        <div className="col-4 text-start">
          <label for="rend" className="text-start">Lend End</label>
          <input type="date" class="form-control" id="rend" onChange={handleChange("rend")}/>
        </div>
      </div>

      {/*Description*/}
      <div className="row">
        <div className="col text-start">
          <label for="descr">Description</label>
          <textarea type="text-area" class="form-control" id="descr" onChange={handleChange("descr")}/>
        </div>
      </div>

      <br></br>
      <div className="row">
        <div className="col">
          <p className="text-start mt-3">
            NOTE: Though items are free, it is required to enter a monetary amount you believe is adequate compensation 
            in the case of the item being lost, stolen, or damaged. 
          </p>
        </div>
        {/*Compensation*/}
        <div className="col">
          <label for="compensation">Compensation</label>
          <input type="number" class="form-control" id="compensation" onChange={handleChange("compensation")} aria-label="Amount (to the nearest dollar)"/>
        </div>
      </div>

      {/*Confirmation*/}
      <div className="row justify-content-center ps-5 pe-5"> 
        <div className="col text-start">
          <input type="text" className="form-control" id="confirm" placeholder="Confirm" onChange={handleChange("confirm")}/>
          <small class="form-text text-muted">Type "Confirm" to indicate that you acknowledge the above.</small>
        </div>
      </div>
      
      {confirm === "Confirm" ? <button type="submit" className="btn btn-primary mt-3" onClick={handleSubmit}>Save Changes</button> : <></>}
      

    </div>
  );
}

export default EditItemPage;