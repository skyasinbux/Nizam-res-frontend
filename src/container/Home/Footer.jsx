import React from 'react';
import { FiFacebook, FiTwitter, FiInstagram } from 'react-icons/fi';


import { images } from '../../constants';
import './Footer.css';
import { Link } from 'react-router-dom';

const today = new Date();
  const year = today.getFullYear();
const Footer = () => (
  <div className="app__footer section__padding" id="login">
    {/* <FooterOverlay /> */}
    {/* <Newsletter /> */}


    <div className="app__footer-links">
      <div className="app__footer-links_contact">
        <h1 className="app__footer-headtext">Contact Us</h1>
        <p className="p__opensans">Al Ghubrah St, Muscat</p>
        <p className="p__opensans">+968 99159968</p>
        <p className="p__opensans">+968 91194466</p>
      </div>




    <div className="app__footer-links_logo">
      <Link to="/">
        <img src={images.nizam_english} alt="footer_logo" />
      </Link>

      <p className="p__opensans">
        {/* &quot;The best way to find yourself is to lose yourself in the service of others.&quot; */}
        &quot;Nothing brings people together like good FOOD.&quot;
      </p>
      
      <img src={images.spoon} className="spoon__img" style={{ marginTop: 15 }} alt=''/>
      
      <div className="app__footer-links_icons">
        <a href="https://www.facebook.com/profile.php?id=100072689889871&mibextid=ZbWKwL" target="_blank" rel="noopener noreferrer"><FiFacebook /></a>
        <a href="https://www.twitter.com" target="_blank" rel="noopener noreferrer"><FiTwitter /></a>
        <a href="https://www.instagram.com/nizam_restaurant1?igsh=amx6dzB4MHlyOWRw" target="_blank" rel="noopener noreferrer"><FiInstagram /></a>
      </div>
    </div>



      <div className="app__footer-links_work">
        <h1 className="app__footer-headtext">Opening Hours</h1>
        <p className="p__opensans">Monday-Sunday :</p>
        <p className="p__opensans">11:00 AM - 11:45 PM</p>
        <p className="p__opensans">Friday :</p>
        <p className="p__opensans">11:00 AM - 1:00 AM</p>
      </div>
    </div>

    <div className="footer__copyright">
      <p className="p__opensans">


        Copyright © {year} Nizam Restaurant
      </p>
    </div>

  </div>
);

export default Footer;
