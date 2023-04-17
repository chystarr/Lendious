import React from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const SignUpButton = () => {
  const auth = useAuth();
  const navigate = useNavigate();

  if (!auth.isAuthenticated) {
    return (
      <Link className="btn btn-primary me-1" to="/signup">
        Sign Up
      </Link>
    );
  }
  //if user is authenticated do not render the signup button
  return (
    <>
    </>
  )
};

export default SignUpButton;