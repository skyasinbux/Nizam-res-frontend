import { useEffect, useState } from "react";

import { url } from 'assets/assets';
import {images , data } from '../../constants'
import {SubHeading , MenuItem} from '../../components'
import Menu from '../../assets/Menu.pdf';
import { toast } from "react-toastify";

import './SpecialMenu.css';
import axios from "axios";




const SpecialMenu = () => {
  const [list, setList] = useState([]);

  const fetchList = async () => {
    const response = await axios.get(`${url}/api/weekly/weeklylist`);
    if (response.data.success) {
      setList(response.data.data);
    } else {
      toast.error("Error");
    }
  };
  useEffect(() => {
    fetchList();
  }, []);
  return(
  <div className="app__specialMenu flex__center section__padding" id="menu">
    <div className="app__specialMenu-title">
      <SubHeading title="Menu that fits your Cravings" />
      {/* <h1 className="headtext__cormorant">Today&apos;s Special Menu</h1> */}
      <h1 className="headtext__cormorant">Weekly Special Menu</h1>
    </div>

    <div className="app__specialMenu-menu">
      <div className="app__specialMenu-menu_wine  flex__center">
        {/* <p className="app__specialMenu-menu_heading">Wine & Beer</p> */}
        {/* SATURDAY */}
        <div className="app__specialMenu_menu_items">
        <p className="app__specialMenu-menu_heading">Saturday</p>
          {list.map((Saturday, index) => (
            <MenuItem key={Saturday.title + index} title={Saturday.price} price={Saturday.price} tags={Saturday.category}/>
          ))}
        </div>
      </div>

      

      <div className="app__specialMenu-menu_img">
        <img src={images.menu} alt="menu__img" />
      </div>

      <div className="app__specialMenu-menu_cocktails  flex__center">
        {/* <p className="app__specialMenu-menu_heading">Cocktails</p> */}

        {/* SUNDAY */}
        <div className="app__specialMenu_menu_items">
        <p className="app__specialMenu-menu_heading">Sunday</p>
          {data.Sunday.map((Sunday, index) => (
            <MenuItem key={Sunday.title + index} title={Sunday.title} price={Sunday.price} tags={Sunday.tags}/>
          ))}
        </div>
        
        {/* Tuesday */}
        <div className="app__specialMenu_menu_items">
        <p className="app__specialMenu-menu_heading">Tuesday</p>
          {data.Tuesday.map((Tuesday, index) => (
            <MenuItem key={Tuesday.title + index} title={Tuesday.title} price={Tuesday.price} tags={Tuesday.tags}/>
          ))}
        </div>

        
         {/* Friday */}
         <div className="app__specialMenu_menu_items">
        <p className="app__specialMenu-menu_heading">Friday</p>
          {data.Friday.map((Friday, index) => (
            <MenuItem key={Friday.title + index} title={Friday.title} price={Friday.price} tags={Friday.tags} />
          ))}
        </div>
        
      </div>
    </div>

    <div style={{ marginTop: 15 }}>
      <a href={Menu} target="_blank" rel="noreferrer">
        <button type="button" className="custom__button">View More</button>
      </a>
    </div>
  </div>
)};

export default SpecialMenu;
