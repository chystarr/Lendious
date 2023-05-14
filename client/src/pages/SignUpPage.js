import React, { useState, useEffect} from "react";
import { useNavigate, useLocation, Link, Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import LoadingSpinner from "../components/LoadingSpinner";
import lendiousImage from '../images/lendious_icon.png';


function SignUpPage() {
  const auth = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [data, setData] = useState({ name: "", email: "", password: "" });
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [success, setSucess] = useState(false);

  const [user_id, setUser_ID] = useState(0);

  const from = location.state?.from?.pathname || "/";

  const fieldChanged = (name) => {
    return (event) => {
      let { value } = event.target;
      setData((prevData) => ({ ...prevData, [name]: value }));
    };
  };

  useEffect(() => {
    async function getData() {
      setLoading(true);
      try {
        let response = await fetch("/api/auth/size");
        let size = await response.json();
        setUser_ID(size + 1);
        setLoading(false);

      } catch (error){
        console.log("Error fetching user size");
        setError(true);
      }
    }

    getData();

    return () => {
    };
  }, []);



  const signUp = (e) => {
    e.preventDefault();
    let { name, email, password} = data;
    auth
      .register(name, email, password, user_id)
      .then((user) => {
        // setRedirectToReferrer(true); // used in react-router v5
        // in react-router v6 navigate changes the pages directly.
        // comment from official docs example:
        //    Send them back to the page they tried to visit when they were
        //    redirected to the login page. Use { replace: true } so we don't create
        //    another entry in the history stack for the login page.  This means that
        //    when they get to the protected page and click the back button, they
        //    won't end up back on the login page, which is also really nice for the
        //    user experience.
        //navigate(from, { replace: true });
        setSucess(true);
      })
      .catch((err) => {
        setError(true);
      });
  };

  let errorMessage = "";
  if (error) {
    errorMessage = (
      <div className="alert alert-danger" role="alert">
        Sign Up Failed
      </div>
    );
  }


  if(loading) return <LoadingSpinner/>
  //if new user created, send to the joinBuilding page
  if(success) return <Navigate to="/buildings" />

  return (
    <div className="login">
      <div className="login_wrapper">
        <div className="login_wrap">
          <div className="login_1">
            <img src={lendiousImage} alt="Lendious Logo" className="img-fluid" />
            <span>
              Like a good neighbor
            </span>
          </div>
          <div className="login_2">
          <form onSubmit={signUp}>  
              <div className="login_2_wrap">
              {errorMessage}
                            <input
                             type="text"
                             className="form-control w-100"
                             name="name"
                             placeholder="Name"
                             value={data.name}
                             onChange={fieldChanged("name")}
                            />
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
                            Sign-up
                          </button>
              </div>
            </form>
          </div>
        </div>
        <div className="register"></div>
      </div>
    </div>
  );
}

export default SignUpPage;