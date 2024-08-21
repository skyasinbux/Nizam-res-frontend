import React from "react";
import { Link } from "react-router-dom";
import "./Chef.css";
import { SubHeading } from "../../components";
import { images } from "../../constants";
const Chef = () => (
  <div className="app__bg app__wrapper section__padding">
    <div className="app__wrapper_img app__wrapper_img-reverse">
      <img src={images.chef} alt="chef-img?" />
    </div>
    <div className="app__wrapper_info">
      <SubHeading title="Chef's Word" />
      <h1 className="headtext__cormorant">What We Believe In</h1>
      <div className="app__chef-content">
        <div className="app__chef-content_quote">
          <img src={images.quote} alt="quote" />
          
        </div>
        <p className="p__opensans" >At <Link className="chef_word">Nizam Restaurant</Link>, each dish is crafted with passion and precision. We honor tradition while embracing innovation, creating the perfect blend of aromatic spices and tender meat or vegetables in every bite. Our biryanis are a celebration of flavor, where each grain of rice is infused with the essence of our handpicked ingredients. From the first aroma to the last bite, <Link className="chef_word_last">we invite you to experience the art of Hyderabadi biryani like never before</Link>.</p>
      </div>

      <div className="app__chef-sign">
        <p>Shaikh Basit</p>
        <p className="p__opensans"> Chef</p>
        <img src={images.sign} alt="" />
      </div>
    </div>
  </div>
);

export default Chef;
