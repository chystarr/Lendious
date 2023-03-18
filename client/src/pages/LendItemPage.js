import React, { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import ErrorAlert from "../components/ErrorAlert";

function LendItemPage() {

  const [name, setName] = useState("");
  const [compensation, setCompensation] = useState(0);
  const [rstart, setRStart] = useState("");
  const [rend, setREnd] = useState("");
  const [condition, setCondition] = useState("");
  const [descr, setDescr] = useState("");


  const handleChange = (input) => e => {
    if (input === "name"){
      setName(e.target.value);
    } else if (input === "compensation") {
      setCompensation(Number(e.target.value));
    } else if (input === "rstart") {
      setRStart(e.target.value);
    } else if (input === "rend") {
      setREnd(e.target.value);
    } else if (input === "condition") {
      setCondition(e.target.value);
    } else if (input === "descr") {
      setDescr(e.target.value);
    }
  }

  const handleSubmit = async(event) => {
    event.preventDefault();
  }


  return (
    <div className="container-fluid text-center">
      {/*Name*/} 
      <div className="row justify-content-center"> 
        <div className="col text-start">
          <label for="name">Name</label>
          <input type="text" class="form-control" id="name" placeholder="Monopoly: Among Us Edition" onChange={handleChange("name")}/>
        </div>
      </div>

      <div className="row">
        {/*Condition*/}
        <div className="col-4 text-start">
          <label for="condition" className="text-start">Condition</label>
          <select  name = "condition" id="condition" class="form-select" onChange={handleChange("compensation")}>
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

      <p className="text-start mt-3">
        NOTE: Though items are free, it is required to enter a monetary amount you believe is adequate compensation 
        in the case of the item being lost, stolen, or damaged. 
      </p>
      {/*Compensation*/}
      <div className="row">
        <div className="col">
          <label for="compensation">Compensation</label>
          <input type="number" class="form-control" id="compensation" onChange={handleChange("compensation")} aria-label="Amount (to the nearest dollar)"/>
        </div>
      </div>

      <button type="submit" className="btn btn-primary mt-3" onClick={handleSubmit}>Submit</button>

    </div>
  );
}

export default LendItemPage;