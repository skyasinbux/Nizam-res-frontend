import React from 'react';
import { TiThMenu } from "react-icons/ti";

import { MdOutlineRestaurantMenu } from 'react-icons/md';
import images from '../../constants/images';
import './Navbar.css';
import { Link } from 'react-router-dom';



const Navbar = () => {
  const [toggleMenu, setToggleMenu] = React.useState(false);
  return (
    <nav className="app__navbar">
      <div className=".app__navbar-logo">
      <a href="/">

        
        <img className='nizam_en' src={images.Nizam_logo} alt="app__logo" />

        

      </a>
        

      </div>
      <ul className="app__navbar-links">
        <li className="p__opensans"><Link to="/">Home</Link></li>
        <li className="p__opensans"><a href="#about">About</a></li>
        <li className="p__opensans"><a href="#menu">Menu</a></li>
        <li className="p__opensans"><a href="#contact">Contact</a></li>


      </ul>
      <div className="app__navbar-login">
      <Link to="/order" className="Btn-order-now">Order Now</Link>
        <div />
        <Link to="/book" className="Btn-book-table">Book Table</Link>

      </div>
      <div className="app__navbar-smallscreen">
        <TiThMenu className='toggle_icon' onClick={() => setToggleMenu(true)} />
        {toggleMenu && (
          <div className="app__navbar-smallscreen_overlay flex__center slide-bottom">
            <MdOutlineRestaurantMenu fontSize={27} className="overlay__close" onClick={() => setToggleMenu(false)} />
            <ul className="app__navbar-smallscreen_links">
              <li><Link to="/" onClick={() => setToggleMenu(false)}>Home</Link></li>
              <li><a href="#about" onClick={() => setToggleMenu(false)}>About</a></li>
              <li><a href="#menu" onClick={() => setToggleMenu(false)}>Menu</a></li>
              <li><a href="#contact" onClick={() => setToggleMenu(false)}>Contact</a></li>
              <li><Link to="/order" onClick={() => setToggleMenu(false)}>Party Order</Link></li>
              <li><Link to="/book" onClick={() => setToggleMenu(false)}>Book Table</Link></li>
              
            </ul>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
