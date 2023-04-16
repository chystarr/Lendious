import React, { useState } from "react";
import { useNavigate, useLocation, Link, Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

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
  if (success) return <Navigate to={"/listings/" + b_id}/>

  return (
    <section className="vh-100 align-items-center mt-5">
      <div
        className="px-4 py-5 px-md-5 text-center text-lg-start "
        style={{ backgroundColor: "hsl(0, 0%, 96%)" }}
      >
        <div className="container">
          <div className="row gx-lg-5 align-items-center">
            <div className="col-lg-6 mb-5 mb-lg-0 h-100">
              <div className="card">
                <div className="card-body py-5 px-md-5">
                  <div className="row">
                    <div>
                      <form onSubmit={login}>
                        <div className="form-row">
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
                        </div>

                        <button
                          type="submit"
                          className="btn btn-primary btn-block mb-4"
                        >
                          Sign-in
                        </button>
                      </form>
                      <div className="align-item-center">
                        Don't have an account?{" "}
                        <Link to="/signup">Register Here</Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-6 mb-5 mb-lg-0">
              <h1 className="my-5 display-3 fw-bold ls-tight">
                Sign<span className="text-primary">-</span>in
                {/*<span class="text-primary">for your tracking needs</span>*/}
              </h1>
              <p style={{ color: "hsl(217 10%, 50.8%)" }}>
                Sign-in to lend!
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default LoginPage;