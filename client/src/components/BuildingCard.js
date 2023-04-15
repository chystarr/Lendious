import React from "react";
import { Link } from "react-router-dom";
import JoinBuildingButton from "./JoinBuildingButton";

function BuildingCard(props,{key}) {
  return (
    <div className="col-10 col-md-8 col-lg-7 mt-3">
        <div className="row card shadow">
          <div className="card-body">
            <div className="col">
                <h1 class="card-title">{props.name}</h1>
            </div>
            <div className = "col">
                <JoinBuildingButton key={key} name={props.name}/>
            </div>
          </div>
        </div>
    </div>
  );
}

export default BuildingCard;