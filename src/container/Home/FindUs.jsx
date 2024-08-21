import React from 'react';

import { SubHeading } from '../../components';
import { images } from '../../constants';
import './FindUs.css';


const FindUs = () => (
  <div className="app__bg app__wrapper section__padding" id="contact">
    <div className="app__wrapper_info">
      <SubHeading title="Contact" />
      <h1 className="headtext__cormorant" style={{ marginBottom: '3rem' }}>Find Us</h1>
      <div className="app__wrapper-content">
      <p className="restaurant_text">NIZAM RESTAURANT</p>
        <p className="p__opensans">Al Ghubrah St, Muscat</p>
        <p>.</p>
        <p className="p__cormorant" style={{ color: '#DCCA87' }}>For table booking/Party order</p>

        <p className="p__opensans">+968 99159968</p>
        <p className="p__opensans">+968 95421740</p>
        <p>.</p>

        <p className="p__cormorant" style={{ color: '#DCCA87' }}>Opening Hours</p>
        
        <p className="p__opensans">Mon - Sun: 11:00 am - 11:45 pm</p>
        <p className="p__opensans">Friday: 11:00 am - 01:00 am</p>
      </div>
      <a href='https://maps.app.goo.gl/RUQdoQtFuUKRNMi26' target="_blank" rel="noopener noreferrer">
      <button type="button" className="custom__button" style={{ marginTop: '2rem' }}>Visit Us</button>
      </a>
    </div>

    <div className="app__findus_img">
      <img src={images.Charminar} alt="finus_img" />
    </div>
  </div>
);

export default FindUs;