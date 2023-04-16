import React, { useState, useEffect, createContext } from "react";

const AuthContext = createContext();
const { Provider } = AuthContext;

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(false);
  const [recievedAuthenticationResponse, setRecievedAuthenticationResponse] = useState(false);

  useEffect(() => {
    checkAuthentication();
  }, []);

  const checkAuthentication = () => {
    fetch("/api/auth/login")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Unauthenticated");
        }

        return response.json();
      })
      .then((body) => setUser(body))
      .catch((err) => setUser(false))
      .finally(() => setRecievedAuthenticationResponse(true));
  }


  const register = (name, email, password, user_id) => {
    //make request to create new user
    return fetch("/api/auth/signup", {
      method: "POST",
      body: JSON.stringify({ name, email, password, user_id }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Signup Failed");
        }

        return response.json();
      })
      .then((body) => {
        setUser(body);
        return body;
      });
  };

  const authenticate = (email, password) => {
    return fetch("/api/auth/login", {
      method: "POST",
      body: JSON.stringify({ email, password }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Login Failed");
        }

        return response.json();
      })
      .then((body) => {
        setUser(body);
        return body;
      });
  };

  const signout = () => {
    return fetch("/api/auth/logout", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Logout Failed");
        }

        return response.json();
      })
      .then((body) => {
        setUser(false);
        return body;
      });
  };

  return (
    <Provider
      value={{
        authenticate,
        register,
        signout,
        isAuthenticated: user ? true : false,
        user,
        recievedAuthenticationResponse
      }}
    >
      {children}
    </Provider>
  );
};

// Create our own hook for accessing the context from any functional component
function useAuth() {
  return React.useContext(AuthContext);
}

export { useAuth, AuthProvider };