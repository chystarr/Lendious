import { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import "../css/AboutPage.css";
import lendiousImage from '../images/lendious_icon.png';
//Button takes you to signup page
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





function LendiousDescription() {
  //animate so that the text fades in when the user enters the page
  const [fadeIn, setFadeIn] = useState(false);
  useEffect(() => {
    setFadeIn(true);
  }, []);


  return (

    <div className={`about-us-container ${fadeIn ? 'fade-in' : ''}`}>
    <img 
      src={lendiousImage} 
      alt="Lendious Logo" 
      className="img-fluid lendious-logo" 
    />
    <div className="about-us">
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

export default LendiousDescription;

