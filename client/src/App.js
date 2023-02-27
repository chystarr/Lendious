import React from "react";
import { BrowserRouter, Routes, Route, Link, NavLink } from "react-router-dom";
import HomePage from "./pages/HomePage";
import ListingsPage from "./pages/ListingsPage";
import MyItemsPage from "./pages/MyItemsPage";
import AboutPage from "./pages/AboutPage";

import "./App.css";

function Navigation(props) {
  return (
    <nav className="navbar navbar-expand-sm navbar-dark bg-dark shadow mb-3">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">
          Lendious
        </Link>
        <ul className="navbar-nav me-auto">
          <li className="nav-item">
            <NavLink className="nav-link" to="/listings">
              Listings
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink className="nav-link" to="/my-items">
              My Items
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink className="nav-link" to="/about">
              About
            </NavLink>
          </li>
        </ul>
      </div>
    </nav>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Navigation />
      <div className="container-xl text-center">
        <div className="row justify-content-center">
          <Routes>
            <Route path="/listings" element={<ListingsPage />} />
            <Route path="/my-items" element={<MyItemsPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/" element={<HomePage />} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
