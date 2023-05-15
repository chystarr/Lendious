import React, { useState, useEffect} from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import LoadingSpinner from "../components/LoadingSpinner";
import lendiousImage from '../images/lendious_icon.png';


function SignUpPage() {
  const auth = useAuth();
  const [data, setData] = useState({ name: "", email: "", password: "" });
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [success, setSucess] = useState(false);

  const [user_id, setUser_ID] = useState(0);

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