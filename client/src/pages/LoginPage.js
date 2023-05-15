import React, { useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import lendiousImage from '../images/lendious_icon.png';
import "../css/LoginPage.css";


function LoginPage() {
  const auth = useAuth();
  const [data, setData] = useState({ email: "", password: "" });
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);
  const [user, setUser] = useState({});
  const [b_id, setB_id] = useState(0);

  const fieldChanged = (name) => {
    return (event) => {
      let { value } = event.target;
      setData((prevData) => ({ ...prevData, [name]: value }));
    };
  };

  const login = (e) => {
    e.preventDefault();
    let { email, password } = data;
    auth
      .authenticate(email, password)
      .then((user) => {
        console.log("after auth");
        setUser(user);
        getBuildingID();
      })
      .catch((err) => {
        setError(true);
      });
  };

  async function getBuildingID()
  {
    try {
      let response = await fetch("/api/buildings/my-building");
      console.log("getting the user building id:")
      console.log(response);
      let bid= await response.json();
      setB_id(bid);
      setSuccess(true)
    } catch (error) {
        console.log("Error getting user building id when logging in");
        setError(true);
    }
  }

  let errorMessage = "";
  if (error) {
    errorMessage = (
      <div className="alert alert-danger" role="alert">
        Login Failed
      </div>
    );
  }
  //upon logging back in, go to your buildings listing page instantly
  if (success) return <Navigate to={"/listings"}/>

  return (
    <div className="login fade-in">
      <div className="login_wrapper">
        <div className="login_wrap row">
          <div className="login_1 col">
            <div className="row">
              <div className="col">
                <img src={lendiousImage} alt="Lendious Logo" className="img-fluid" />
              </div>
            </div>
          </div>
          <div className="login_2 col d-flex align-items-center justify-content-center vh-100">
            <form onSubmit={login}>  
              <div className="login_2_wrap col">
                {errorMessage}
                <input
                  type="email"
                  className="form-control w-100"
                  name="email"
                  placeholder="Email"
                  value={data.email}
                  onChange={fieldChanged("email")}
                />
                <input
                  type="password"
                  className="form-control w-100 mb-3"
                  name="password"
                  placeholder="Password"
                  value={data.password}
                  onChange={fieldChanged("password")}
                />
                <button type="submit" className="blue_btn"> Sign-in </button>
                <div className="sign_up">
                  Don't have an account? <Link to="/signup">Sign up</Link>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;