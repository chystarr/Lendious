import React, { useState, useEffect} from "react";
import { useNavigate, useLocation, Link, Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import LoadingSpinner from "../components/LoadingSpinner";

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
      //clean up function
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
    <section className="vh-100">
  <div className="px-4 py-5 px-md-5 text-center text-lg-start mt-5"  style={{backgroundColor: "hsl(0, 0%, 96%)"}}>
    <div className="container">
      <div className="row gx-lg-5 align-items-center">
        <div className="col-lg-6 mb-5 mb-lg-0">
          <h1 className="my-5 display-3 fw-bold ls-tight">
            Like a  <span className = "text-primary">good</span> neighbor
          </h1>
          <p style={{color: "hsl(217 10%, 50.8%)"}}>
            Sign-up and create an account 
            to easily <span className = "text-primary">lend</span> your not-in-use items and 
             <span className = "text-primary"> borrow</span> others in your apartment complex.
          </p>
        </div>

        <div className="col-lg-6 mb-5 mb-lg-0">
          <div className="card">
            <div className="card-body py-5 px-md-5">
                <div className="row">
                  <div>
                  <form onSubmit={signUp}>
                    <div className="form-row">
                      {errorMessage}
                      <input
                        type="text"
                        className="form-control w-100"
                        name="name"
                        placeholder="name"
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
                      </div>

                      <button type="submit" className="btn btn-primary btn-block mb-4">
                        Sign up
                      </button>
                    </form>
                    <div className="align-item-center">
                        Already have an account? <Link to="/login">Sign-in</Link>
                    </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  </div>
  </div>

</section>
  );
}

export default SignUpPage;