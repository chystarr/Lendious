import React from "react";
// https://github.com/CUNYTechPrep/project-starter error message component
function ErrorAlert({ details }) {
  return (
    <div className="d-flex justify-content-center">
      <div className="alert alert-danger" role={"alert"}>
        <strong>An error occurred</strong> {details || ""}
      </div>
    </div>
  );
}

export default ErrorAlert;