import React from 'react';

import { SubHeading } from '../../components';
import { images } from '../../constants';
import './Header.css';

const Header = () => (
  <div className="app__header app__wrapper section__padding" id="home">
    <div className="app__wrapper_info">
      <SubHeading title="Chase the new flavour" />
      <h1 className="app__header-h1">The Key To Fine Dining</h1>
      <p className="p__opensans" style={{ margin: '2rem 0' }}>Where passion meets the plate, every dish tells a story of flavor. we don't just serve food, we create unforgettable culinary experiences. Step in, savor, and let the journey begin. </p>
      <a href='#menu'>
      <button type="button" className="custom__button">Explore Menu</button>
      </a>
    </div>

    <div className="app__wrapper_img">
      
      {/* <img className='BiryaniPng' src={images.BiryaniPng} alt="header_img" /> */}
      <img className='BiryaniPng' src={images.BiryaniPng1} alt="header_img" />
      {/* <img className='BiryaniPng' src={images.BiryaniPng2} alt="header_img" /> */}
      {/* <img className='BiryaniPng' src={images.BiryaniPng3} alt="header_img" /> */}
      
    </div>
  </div>
);

export default Header;