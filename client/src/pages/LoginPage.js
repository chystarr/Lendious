import React, { useState } from "react";
import { useNavigate, useLocation, Link, Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import lendiousImage from '../images/lendious_icon.png';
import { Formik, Form } from "formik";
import "../css/LoginPage.css";


function LoginPage() {
  const auth = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [data, setData] = useState({ email: "", password: "" });
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);
  const [user, setUser] = useState({});
  const [b_id, setB_id] = useState(0);

  const from = location.state?.from?.pathname || "/";

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
        // setRedirectToReferrer(true); // used in react-router v5
        // in react-router v6 navigate changes the pages directly.
        // comment from official docs example:
        //    Send them back to the page they tried to visit when they were
        //    redirected to the login page. Use { replace: true } so we don't create
        //    another entry in the history stack for the login page.  This means that
        //    when they get to the protected page and click the back button, they
        //    won't end up back on the login page, which is also really nice for the
        //    user experience.
        //setAuth(true);
        //navigate(from, { replace: true });
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
        <div className="login_wrap">
          <div className="login_1">
            <img src={lendiousImage} alt="Lendious Logo" className="img-fluid" />
            <span>
              Like a good neighbor
            </span>
          </div>
          <div className="login_2">
          <form onSubmit={login}>  
              <div className="login_2_wrap">
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
                            <button
                            type="submit"
                            className="blue_btn"
                          >
                            Sign-in
                          </button>
              </div>
            </form>
             <div className="signup">
              <Link to="/signup" className="blue_btn2 open_signup">Sign up</Link>
                <div className="sign_splitter"></div>
              </div>
          </div>
        </div>
        <div className="register"></div>
      </div>
    </div>
  );
}

export default LoginPage;

<button type="submit" className="blue_btn"></button>