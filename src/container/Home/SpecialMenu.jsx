import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { images } from '../../constants';
import { SubHeading, MenuItem } from '../../components';
import { url, currency } from '../../assets/assets';
import { Link } from 'react-router-dom';
import './SpecialMenu.css';

const SpecialMenu = () => {
  const [speciallist, setSpecialList] = useState([]);

  const fetchSpecialMenu = async () => {
    try {
      const response = await axios.get(`${url}/api/weekly/weeklylist`);
      if (response.data.success) {
        setSpecialList(response.data.data);
      }
    } catch (error) {
      if (error.response) {
        console.error('Error Response:', error.response.data);
      } else if (error.request) {
        console.error('Error Request:', error.request);
      } else {
        console.error('Error Message:', error.message);
      }
    }
  };

  useEffect(() => {
    fetchSpecialMenu();
  }, []);

  // Group items by category
  const groupedItems = speciallist.reduce((acc, item) => {
    if (!acc[item.category]) {
      acc[item.category] = [];
    }
    acc[item.category].push(item);
    return acc;
  }, {});

  // Convert groupedItems object to an array of categories
  const categories = Object.keys(groupedItems);

  // Define split points
  const numCategoriesOnLeft = 4;
  const leftCategories = categories.slice(0, numCategoriesOnLeft);
  const rightCategories = categories.slice(numCategoriesOnLeft);

  return (
    <div className="app__specialMenu flex__center section__padding" id="menu">
      <div className="app__specialMenu-title">
        <SubHeading title="Menu that fits your Cravings" />
        <h1 className="headtext__cormorant">Weekly Special Menu</h1>
      </div>

      <div className="app__specialMenu-menu">
        <div className="app__specialMenu-menu_left">
          {leftCategories.map((category) => (
            <div key={category}>
              <p className="app__specialMenu-menu_heading">{category}</p>
              {groupedItems[category].map((item, index) => (
                <MenuItem key={index} name={item.name}  currency={currency} price={item.price.toFixed(3)} />
              ))}
            </div>
          ))}
        </div>

        <div className="app__specialMenu-menu_img">
          <img src={images.menu} alt="menu__img" />
        </div>

        <div className="app__specialMenu-menu_right">
          {rightCategories.map((category) => (
            <div key={category}>
              <p className="app__specialMenu-menu_heading">{category}</p>
              {groupedItems[category].map((item, index) => (
                <MenuItem key={index} name={item.name} price={item.price.toFixed(3)} currency={currency} />
              ))}
            </div>
          ))}
        </div>
      </div>

      <div style={{ marginTop: 15 }}>
        <Link to="/menu" className="custom__button">View More</Link>
      </div>
    </div>
  );
};

export default SpecialMenu;
