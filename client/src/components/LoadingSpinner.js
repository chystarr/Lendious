import React from "react";
// https://github.com/CUNYTechPrep/project-starter loading spinner component
function LoadingSpinner() {
  return (
    <div className="d-flex justify-content-center">
      <div className="spinner-border text-dark" role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
    </div>
  );
}

export default LoadingSpinner;
