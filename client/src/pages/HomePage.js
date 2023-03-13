import React, { useState, useEffect } from "react";



function LoginButton(props) {
  return (
    <a href="HomePage.js">
    <button onClick={props.onClick}>
      Login
    </button></a>
  );
}

function LogoutButton(props) {
  return (
    <button onClick={props.onClick}>
      Logout
    </button>
  );
}

function HomePage() {
  return (
    <div>
      <p>Welcome to Lendious</p>
      <p>Empowering communities through shared ownership: Lend what you don't use, use what you need</p>
      <LoginButton />
      <LogoutButton />
    </div>
  );
}

export default HomePage;
