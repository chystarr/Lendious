import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import "../css/AboutPage.css";
import lendiousImage from '../images/lendious_icon.png';


function LearnMore(props) {
  const buttonStyle = {
    fontFamily: 'Lucida Console, monospace',
    fontSize: '16px',
    backgroundColor: '#FFFF8A',
    color: 'black',
    cursor: 'pointer',
    textDecoration: 'none'
  };
  const hoverStyle = {
    textDecoration: 'underline'
  };

  return (  
    <Link to='/signup'>  
    <button className="btn" style={buttonStyle} onClick={props.onClick}>
      Sign up now!
    </button></Link>
  );
}



function LendiousDescription(){
  return (
    <div className="about-us-container">
      <img src={lendiousImage} alt="Lendious Logo" className="img-fluid" />
      <div className = "about-us">
        <h1 className="about-us-header">About Us</h1>
        <p className="about-us-description mb-0 font-weight-normal" style={{ fontFamily: 'Lucida Console, monospace' }}>
          We are a team of passionate developers who are devoted to reigniting the spark of a friendly, supportive, 
          and neighborly warmth of a tight-knit community. In today’s society - especially in urban areas - 
          little communal interaction exists. Such a neighborly community has become a thing of the past with 
          the expansion of urbanism. Our solution is Lendious, an app that takes on the role of a community library, 
          but for common household objects such as tools, books, and more.
        </p>
      </div>
      <div className="lendious-description bg-light rounded mt-4" style={{margin: '10%'}}>
        <h2 className="why-lendious">Why Lendious?</h2>
        <p className="lendious-access font-weight-normal" style={{ fontFamily: 'Lucida Console, monospace', margin: '10px 0' }}>
          Get access to a diverse range of objects without breaking the bank. With this platform, you can lend 
          and borrow as you please while forming tighter community connections.
        </p>
        <LearnMore />
      </div>
      
    </div>
  );
}

function AboutPage() {
  return (
    <div>
      <LendiousDescription />
      
    </div>
  );
}

export default AboutPage;


/**
 
function LendiousDescription(){
  return (
    <div className="about-us-container">
      <h1 className="about-us-header">About Us</h1>
      <p className="about-us-description">
        We are a team of passionate developers who love are using our skills to keep our earth clean (obvi change this b.s).
      </p>
      <div className="about-us-team">
        <div className="about-us-member">
          <img src="https://placehold.it/200x200" alt="Member 1" />
          <h2>John Doe</h2>
          <p>Front-end Developer</p>
        </div>
        <div className="about-us-member">
          <img src="https://placehold.it/200x200" alt="Member 2" />
          <h2>Jane Doe</h2>
          <p>Back-end Developer</p>
        </div>
        <div className="about-us-member">
          <img src="https://placehold.it/200x200" alt="Member 3" />
          <h2>James Smith</h2>
          <p>Full-stack Developer</p>
        </div>
      </div>
      <p className="about-us-centered">We strive to create beautiful and functional web applications that provide a great user experience and problem solving (same with this)</p>
      <img src={lendiousImage} alt="Lendious Logo" className="img-fluid" />
    </div>
  );

}
 */
/**
 * function LendiousDescription(){
  return (
    <div className="container py-5">
      <div className="col-md-6 mb-4">
        <img src={lendiousImage} alt="Lendious Logo" className="img-fluid" />
      </div>
      <div className="row">
        <h1 className="display-4 mb-4 font-weight-bold">About Us</h1>
            <p className="about-us-description mb-0 font-weight-normal" style={{ fontFamily: 'Lucida Console, monospace' }}>
              We are a team of passionate developers who are devoted to reigniting the spark of a friendly, supportive, 
              and neighborly warmth of a tight-knit community. In today’s society - especially in urban areas - 
              little communal interaction exists. Such a neighborly community has become a thing of the past with 
              the expansion of urbanism. Our solution is Lendious, an app that takes on the role of a community library, 
              but for common household objects such as tools, books, and more.
            </p>
          <div className="col-md-6">
            <h1 className="display-4 mb-4 font-weight-bold">Why Lendious</h1>
          <div className="p-4 bg-light rounded">
            <p className="lead mb-0 font-weight-normal" style={{ fontFamily: 'Lucida Console, monospace' }}>
              Get access to a diverse range of objects without breaking the bank. With this platform, 
              you can lend and borrow as you please while forming tighter community connections.
            </p>
            <LearnMore />
          </div>
        </div>
      </div>
  </div>
  );

}


 */
/*
function LendiousDescription(){
  return (
    <div className="container py-5">
        <div className="col-md-6 mb-4">
          <img src={lendiousImage} alt="Lendious Logo" className="img-fluid mx-auto" />
        </div>
        
      <h1 className="display-4 mb-4 font-weight-bold">About Us</h1>
          <p className="about-us-description mb-0 font-weight-normal" style={{ fontFamily: 'Lucida Console, monospace' }}>
            We are a team of passionate developers who are devoted to reigniting the spark of a friendly, supportive, 
            and neighborly warmth of a tight-knit community. In today’s society - especially in urban areas - 
            little communal interaction exists. Such a neighborly community has become a thing of the past with 
            the expansion of urbanism. Our solution is Lendious, an app that takes on the role of a community library, 
            but for common household objects such as tools, books, and more.
          </p>
      <div className="row">
        <div className="col-md-6">
          
          <div className="p-4 bg-light rounded mt-4">
            <h2 className="mb-4 font-weight-bold">Why Lendious?</h2>
            <p className="lead mb-0 font-weight-normal" style={{ fontFamily: 'Lucida Console, monospace' }}>
              Get access to a diverse range of objects without breaking the bank. With this platform, you can lend 
              and borrow as you please while forming tighter community connections.
            </p>
            <LearnMore />
          </div>
        </div>
      </div>
    </div>
  );
}*/
/*
function LendiousDescription(){
  return (
    <div className="about-us-container">
      <img src={lendiousImage} alt="Lendious Logo" className="img-fluid" />
      <h1 className="about-us-header">About Us</h1>
      <p className="about-us-description mb-0 font-weight-normal" style={{ fontFamily: 'Lucida Console, monospace' }}>
        We are a team of passionate developers who are devoted to reigniting the spark of a friendly, supportive, 
        and neighborly warmth of a tight-knit community. In today’s society - especially in urban areas - 
        little communal interaction exists. Such a neighborly community has become a thing of the past with 
        the expansion of urbanism. Our solution is Lendious, an app that takes on the role of a community library, 
        but for common household objects such as tools, books, and more.
      </p>
      
      <div className="lendious-description bg-light rounded mt-4">
      <h2 className="why-lendious">Why Lendious?</h2>
            <p className="lendious-access font-weight-normal" style={{ fontFamily: 'Lucida Console, monospace' }}>
              Get access to a diverse range of objects without breaking the bank. With this platform, you can lend 
              and borrow as you please while forming tighter community connections.
            </p>
            <LearnMore />
      </div>
      
    </div>
  );

}*/