import React, { useState, useEffect } from "react";

function LearnMore(props) {
  return (
    <a href="HomePage.js">
    <button onClick={props.onClick}>
      Learn More
    </button></a>
  );
}

function AboutPage() {
  return (
    <div>
     <h1>Why Lendious</h1>
      <p>
        Get access to a diverse range of objects without breaking the bank. With this platform, 
        you can lend and borrow as you please while forming tighter community connections
      </p>
      <LearnMore />
    </div>
  );
}

export default AboutPage;