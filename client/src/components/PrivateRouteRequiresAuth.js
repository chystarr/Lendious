import { useAuth } from "../context/AuthContext";
import React, { useEffect } from "react";
import { useLocation, Navigate } from "react-router-dom";
import LoadingSpinner from "./LoadingSpinner";

function PrivateRouteRequiresAuth({ children }) {
  let auth = useAuth();
  let location = useLocation();

  let { recievedAuthenticationResponse, isAuthenticated } = auth;
  console.log("recievedAuthenticationResponse:" +  recievedAuthenticationResponse)
  console.log("isAuthenticated:" + isAuthenticated);

  /* if (!auth.isAuthenticated) {
    // Redirect them to the /login page, but save the current location they were
    // trying to go to when they were redirected. This allows us to send them
    // along to that page after they login, which is a nicer user experience
    // than dropping them off on the home page.
    return <Navigate to="/login" state={{ from: location }} replace />;
  } */
  
  useEffect(() => {
    // Perform the authentication check asynchronously.
    if (!recievedAuthenticationResponse) return;
  }, [recievedAuthenticationResponse]);

  return !recievedAuthenticationResponse ? ( //get the signal
    <LoadingSpinner />  //load while waiting for signal
  ) : !isAuthenticated ? (  //check the signal
    <Navigate to="/login" state={{ from: location }} replace /> //if (not authenticated) go to login page
  ) : (
    children //else return the components wrapped by the parent context
  );

  //return children;
}

export default PrivateRouteRequiresAuth;