import React from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const AuthButton = () => {
  const auth = useAuth();
  const navigate = useNavigate();

  if (!auth.isAuthenticated) {
    return (
      <Link className="btn border border-primary text-white me-3" to="/login">
        Sign in
      </Link>
    );
  }

  const logout = () => {
    auth.signout().then(() => navigate("/"));
  };

  return (
    <div className="text-white">
    <div className="d-flex align-items-center">
      <div>Welcome! {auth.user.name}</div>
      <button className="btn btn-primary ms-3" onClick={logout}>
        Logout
      </button>
    </div>
  </div>
  );
};

export default AuthButton;