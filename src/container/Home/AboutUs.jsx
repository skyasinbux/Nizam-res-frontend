import React from 'react';

import { images } from '../../constants';
import './AboutUs.css';

const AboutUs = () => (
  <div className="app__aboutus app__bg flex__center section__padding" id="about">
    <div className="app__aboutus-overlay flex__center">
      <img src={images.G} alt="G_overlay" />
    </div>

    <div className="app__aboutus-content flex__center">
      <div className="app__aboutus-content_about">
        <h1 className="headtext__cormorant">About Us</h1>
        <img src={images.spoon} alt="about_spoon" className="spoon__img" />
        <p className="p__opensans">Nizam Restaurant is one among the finest and best restaurants in Muscat city. We are famous in oman for our Hyderabadi biryani, Mutton tahari, Special mutton haleem, Mutton akni pulao, Mutton achari, Chicken tahari, Bukhari chicken, Bagara khana dalcha. we also serve many others ...</p>
        <button type="button" className="custom__button">Know More</button>
      </div>

      <div className="app__aboutus-content_knife flex__center">
        <img src={images.knife} alt="about_knife" />
      </div>

      <div className="app__aboutus-content_history">
        <h1 className="headtext__cormorant">Our History</h1>
        <img src={images.spoon} alt="about_spoon" className="spoon__img" />
        <p className="p__opensans">We are serving since 2007, A small 100-seater restaurant started serving typical Hyderabadi cuisine like Biryani etc. As we continue to grow, we honor our rich history and look forward to welcoming new generations of food enthusiasts to savor the flavors that have defined us for over a decade.</p>
        <button type="button" className="custom__button">Know More</button>
      </div>
    </div>
  </div>
);

export default AboutUs;