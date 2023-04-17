import React, { useState, useEffect } from "react";
import "./../component_css/AboutPage.css"
import styled from 'styled-components'

function LearnMore(props) {
  return (
    <a href="HomePage.js">
    <button onClick={props.onClick}>
      Learn More
    </button></a>
  );
}
/*
function LearnMore(props) {
  const Button = styled.button`
  display: inline-block;
  color: palevioletred;
  font-size: 1em;
  margin: 1em;
  padding: 0.25em 1em;
  border: 2px solid palevioletred;
  border-radius: 3px;
  display: block;
`;
  return (
    <Button as = "a" href="HomePage.js" onClick={props.onClick}>
      Learn More
    </Button>
  );
}
*/
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