import basket_icon from "./basket_icon.png";
import logo from "./logo.png";
import header_img from "./header_img.png";
import search_icon from "./search_icon.png";
import menu_1 from "./menu_1.png";

import rating_starts from "./rating_starts.png";
import food_1 from "./food_1.png";

import food_32 from "./food_32.png";

import add_icon_white from "./add_icon_white.png";
import add_icon_green from "./add_icon_green.png";
import remove_icon_red from "./remove_icon_red.png";
import linkedin_icon from "./linkedin_icon.png";
import facebook_icon from "./facebook_icon.png";
import twitter_icon from "./twitter_icon.png";
import cross_icon from "./cross_icon.png";
import selector_icon from "./selector_icon.png";

export const assets = {
  logo,
  basket_icon,
  header_img,
  search_icon,
  rating_starts,
  add_icon_green,
  add_icon_white,
  remove_icon_red,
  linkedin_icon,
  facebook_icon,
  twitter_icon,
  cross_icon,
  selector_icon,
};

export const menu_list = [
  {
    menu_name: "All",
    menu_image: menu_1,
  },
  //   {
  //     menu_name: "Starters",
  //     menu_image: menu_2,
  //   },
  //   {
  //     menu_name: "Main Course",
  //     menu_image: menu_3,
  //   },
  //   {
  //     menu_name: "Deserts",
  //     menu_image: menu_4,
  //   },
];

export const food_list = [
  {
    food_id: 1,
    food_name: "Greek salad",
    food_image: food_1,
    food_price: 12,
    food_desc:
      "Food provides essential nutrients for overall health and well-being",
    food_category: "All",
  },
  {
    food_id: 32,
    food_name: "Cooked Noodles",
    food_image: food_32,
    food_price: 15,
    food_desc:
      "Food provides essential nutrients for overall health and well-being",
    food_category: "All",
  },
];

export const url = "http://localhost:4000";
