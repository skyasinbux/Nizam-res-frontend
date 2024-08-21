import React from 'react';
import {SubHeading , MenuItem} from '../../components'
import './Menu.css';
import { useEffect, useState } from "react";
import { url,currency} from "../../assets/assets";
import axios from "axios";
import { toast } from "react-toastify";




const Menu = () => {
  const [list, setList] = useState([]);


  const fetchMenu = async () => {
    const response = await axios.get(`${url}/api/food/list`);
    if (response.data.success) {
      setList(response.data.data);
    } else {
      toast.error("Error");
    }
  };
  useEffect(() => {
    fetchMenu();
  }, []);


  return (
    <div>
      <div className="app__specialMenu flex__center section__padding" id="menu">
    <div className="app__specialMenu-title">
      <SubHeading title="Menu that fits your Cravings" />
      {/* <h1 className="headtext__cormorant">Today&apos;s Special Menu</h1> */}
      <h1 className="headtext__cormorant">Menu</h1>
    </div>

    <div className="app__specialMenu-menu">
      <div className="app__specialMenu-menu_wine  flex__center">
      
                  
               
        <div className="app__specialMenu_menu_items">
        
        {list.map((item, index) => {
          return (
        <div key={index}>

            <MenuItem name={item.name} price={item.price.toFixed(3)} currency={currency} />

        </div>
          );
        })}
         
        </div>
      </div>
    </div>
  </div>
    </div>
    
  )
}

export default Menu

