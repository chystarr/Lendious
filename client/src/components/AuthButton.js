import React from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const AuthButton = () => {
  const auth = useAuth();
  const navigate = useNavigate();

  if (!auth.isAuthenticated) {
    return (
      <Link className="btn border border-primary text-white me-3" to="/login">
        Log in
      </Link>
    );
  }

  const logout = () => {
    auth.signout().then(() => navigate("/"));
  };

  return (
    <div className="text-white">
      Welcome! {auth.user.name}
      <button className="btn btn-primary" onClick={logout}>
        Logout
      </button>
    </div>
  );
};

export default AuthButton;