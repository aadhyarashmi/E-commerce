import React from 'react';
import playStore from "../../../images/playstore.png";
import appStore from "../../../images/appstore.png";
import "./Footer.css";

const Footer = () => {
  return (
    <footer id = "footer">
        <div className ="leftFooter">
            <h4>DOWNLOAD OUR APP</h4>
            <p>Download App for Android and iOS Mobile Phones</p>
            <img src={playStore} alt="playstore"/>
            <img src={appStore} alt="appstore"/>

        </div>

        <div className ="midFooter">
            <h1>E-COMMERCE</h1>
            <p>Smart shopping starts here!</p>
            <p>Copyrights 2025 &copy; EcommerceAad</p>

        </div>

        <div className ="rightFooter">
            <h4>Follow Us</h4>
            <a href='http://instagram.com/ecommerce'>Instagram</a>
            <a href='http://facebook.com/ecommerce'>Facebook</a>
            <a href='http://youtube.com/ecommerce'>Youtube</a>


        </div>
    </footer>

  )
}

export default Footer