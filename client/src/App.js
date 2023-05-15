import React from "react";
import { BrowserRouter, Routes, Route, Link, NavLink, useLocation } from "react-router-dom";
import HomePage from "./pages/HomePage";
import ListingsPage from "./pages/ListingsPage";
import MyItemsPage from "./pages/MyItemsPage";
import AboutPage from "./pages/AboutPage";
import LendItemPage from "./pages/LendItemPage";
import EditItemPage from "./pages/EditItemPage";
import ChatPage from "./pages/ChatPage";
import { AuthProvider } from "./context/AuthContext";
import AuthButton from "./components/AuthButton";
import LoginPage from "./pages/LoginPage";
import SignUpPage from "./pages/SignUpPage";
import RequestsPage from "./pages/RequestsPage";
import "./App.css";
import SignUpButton from "./components/SignUpButton";
import PrivateRouteRequiresAuth from "./components/PrivateRouteRequiresAuth";

function Navigation(props) {
  const location = useLocation();
  const disabled = location.pathname === '/buildings';

  return (
    <nav className="navbar navbar-expand-sm navbar-dark bg-dark shadow mb-3">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/listings">
          Lendious
        </Link>
        <ul className="navbar-nav me-auto">
          <li className="nav-item">
            {!disabled ?
              <NavLink className="nav-link" to="/listings">
                Listings
              </NavLink>
              :
              <NavLink></NavLink>}
          </li>
          <li className="nav-item">
            {!disabled ?
              <NavLink className="nav-link" to="/my-items">
                My Items
              </NavLink>
              :
              <NavLink></NavLink>}
            
          </li>
          <li className="nav-item">
            {!disabled ?
              <NavLink className="nav-link" to="/requests">
                Requests
              </NavLink>
              :
              <NavLink></NavLink>}
          </li>
          <li className="nav-item">
            {!disabled ? 
            <NavLink className="nav-link" to="/about">
              About
            </NavLink>
            :
            <NavLink></NavLink>}
          </li>
        </ul>
        <AuthButton/>
        <SignUpButton/>
      </div>
      
    </nav>
  );
}

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Navigation />
        <div className="container-xl text-center">
          <div className="row justify-content-center">
            <Routes>
              <Route path="/signup" element={<SignUpPage />} />
							<Route path="/login" element={<LoginPage />} />
              <Route path="/listings" element={<PrivateRouteRequiresAuth> <ListingsPage /> </PrivateRouteRequiresAuth>} />
              <Route path="/my-items" element={<PrivateRouteRequiresAuth>  <MyItemsPage /> </PrivateRouteRequiresAuth>} />
              <Route path="/requests" element={<PrivateRouteRequiresAuth>  <RequestsPage /> </PrivateRouteRequiresAuth>} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/buildings" element={<PrivateRouteRequiresAuth> <HomePage /> </PrivateRouteRequiresAuth>} />
              <Route path="/form/new/:building_id" element={<PrivateRouteRequiresAuth> <LendItemPage/> </PrivateRouteRequiresAuth>} />
              <Route path="*" element={<PrivateRouteRequiresAuth> <ListingsPage /> </PrivateRouteRequiresAuth>}/>
              <Route path="/form/edit/:listing_id" element={<PrivateRouteRequiresAuth> <EditItemPage/> </PrivateRouteRequiresAuth>} />
              <Route path="/chat/:listing_id" element={<PrivateRouteRequiresAuth> <ChatPage/> </PrivateRouteRequiresAuth>} />
            </Routes>
          </div>
        </div>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
