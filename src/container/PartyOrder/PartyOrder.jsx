import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './PartyOrder.css';
import Cart from './Cart';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; // Import the CSS for toast notifications
import { url } from '../../assets/assets';
import { FaShoppingCart } from "react-icons/fa";
import { MdOutlineRestaurantMenu } from 'react-icons/md';

const PartyOrder = () => {
  const [list, setList] = useState([]);
  const [category, setCategory] = useState('All');
  const [quantity, setQuantity] = useState({});
  const [order, setOrder] = useState([]);
  const [discount, setDiscount] = useState(0);
  const [customerName, setCustomerName] = useState('');
  const [deliveryAddress, setDeliveryAddress] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [toggleMenu, setToggleMenu] = React.useState(false);

  const fetchList = async () => {
    const response = await axios.get(`${url}/api/category/list`);
    if (response.data.success) {
      setList(response.data.data);
    } else {
      toast.error("Error fetching categories");
    }
  };

  useEffect(() => {
    fetchList();
  }, []);

  useEffect(() => {
    const fetchDiscount = async () => {
      try {
        const response = await axios.get(`${url}/api/cart/discount`);
        setDiscount(response.data.discount);
      } catch (error) {
        toast.error('Error fetching discount');
      }
    };

    fetchDiscount();
  }, []);

  const [foodItems, setFoodList] = useState([]);

  const fetchFoodList = async () => {
    const response = await axios.get(`${url}/api/food/list`);
    if (response.data.success) {
      setFoodList(response.data.data);
    } else {
      toast.error("Error fetching food items");
    }
  };

  useEffect(() => {
    fetchFoodList();
  }, []);

  const incrementItemQuantity = (foodName) => {
    setQuantity(prevQuantity => ({
      ...prevQuantity,
      [foodName]: (prevQuantity[foodName] || 1) + 1
    }));
  };

  const decrementItemQuantity = (foodName) => {
    setQuantity(prevQuantity => ({
      ...prevQuantity,
      [foodName]: Math.max((prevQuantity[foodName] || 1) - 1, 1)
    }));
  };

  const incrementCartQuantity = (index) => {
    const updatedOrder = [...order];
    updatedOrder[index].quantity += 1;
    setOrder(updatedOrder);
  };

  const decrementCartQuantity = (index) => {
    const updatedOrder = [...order];
    if (updatedOrder[index].quantity > 1) {
      updatedOrder[index].quantity -= 1;
      setOrder(updatedOrder);
    }
  };

  const addToOrder = (foodItem) => {
    const existingItem = order.find(item => item.food === foodItem.name);
    if (existingItem) {
      setOrder(order.map(item =>
        item.food === foodItem.name ? { ...item, quantity: item.quantity + (quantity[foodItem.name] || 1) } : item
      ));
    } else {
      setOrder([...order, { food: foodItem.name, quantity: quantity[foodItem.name] || 1, image: foodItem.image, price: foodItem.price }]);
    }
    setQuantity(prevQuantity => ({
      ...prevQuantity,
      [foodItem.name]: 1 // Reset the quantity to 1 after adding to the order
    }));
  };

  const removeFromOrder = (index) => {
    setOrder(order.filter((_, i) => i !== index));
  };

  const filteredFoodItems = category === 'All' 
    ? foodItems.filter(item => item.visible)
    : foodItems.filter(item => item.category === category && item.visible);

  const saveCart = async (event) => {
    event.preventDefault();
    const { total, discountAmount, finalPrice } = calculateTotalPrice();
    try {
      const response = await axios.post(`${url}/api/cart/addcart`, { 
        order, 
        total: parseFloat(total), 
        discount: parseFloat(discountAmount), 
        finalPrice: parseFloat(finalPrice),
        customerName,
        deliveryAddress,
        phoneNumber,
      });
      if (response.data.success) {
        toast.success("Order received! Thank you.");
        setOrder([]);  // Reset the cart
        setQuantity({}); // Reset the quantity state
        setCustomerName(''); // Reset customer name
        setDeliveryAddress(''); // Reset delivery address
        setPhoneNumber(''); // Reset phone number
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error('Error saving cart. Please try again.');
      console.error('Error saving cart:', error);
    }
  };

  const calculateTotalPrice = () => {
    const total = order.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const discountAmount = total * ((discount || 0) / 100);
    const finalPrice = total - discountAmount;
    
    return {
      total: total.toFixed(2),
      discountAmount: discountAmount.toFixed(2),
      finalPrice: finalPrice.toFixed(2),
    };
  };

  return (
    <div className="container">
      <ToastContainer /> {/* Add this to render toast notifications */}

      <div className="categories">
        {list.map(cat => (
          <button
            key={cat.name}
            className={`category-button ${cat.name === category ? 'active' : ''}`}
            onClick={() => setCategory(cat.name)}
          >
            <img src={`${url}/images/` + cat.image} alt={cat.name} width="30" />
            {cat.name}
          </button>
        ))}
      </div>
      <div className="content">
        <div className="main-section">
          <div className="items">
            {filteredFoodItems.map(item => (
              <div key={item.name} className="item">
                <img src={`${url}/images/` + item.image} alt={item.name} />
                <div className="item-details">
                  <h4 className='text_edit'>{item.name}</h4>
                  <p>OMR : {item.price.toFixed(3)}</p>
                  <div className="quantity-control">
                    <button onClick={() => decrementItemQuantity(item.name)}>-</button>
                    <span>{quantity[item.name] || 1}</span>
                    <button onClick={() => incrementItemQuantity(item.name)}>+</button>
                  </div>
                  <button className='addToCartBtn' onClick={() => addToOrder(item)}>Add to cart</button>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="hide_for_sm_screen">
          <div className='cart-section'>
            <Cart 
              order={order} 
              incrementQuantity={incrementCartQuantity} 
              decrementQuantity={decrementCartQuantity} 
              removeFromOrder={removeFromOrder} 
            />
            <p className='form_heading'>Your Info</p>
            <form className='form' onSubmit={saveCart}>
              <div className='input-field'>
                <input
                  required
                  type="text"
                  name="name"
                  id="username"
                  placeholder='Full name'
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                />
              </div>
              <div className='input-field'>
                <input
                  required
                  type="tel"
                  name="mobile"
                  id="username"
                  placeholder='Mobile number'
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                />
              </div>
              <div className='input-field'>
                <input
                  required
                  type="text"
                  name="location"
                  id="username"
                  placeholder='Location'
                  value={deliveryAddress}
                  onChange={(e) => setDeliveryAddress(e.target.value)}
                />
              </div>
              <button className="save-cart-button">Submit</button>
            </form>
          </div>
        </div>

        {/* Small screen */}
        <div className="app__cart-smallscreen">
          <div className='toggle_icon_cart_bg'>
            <FaShoppingCart className='toggle_icon_cart' onClick={() => setToggleMenu(true)} />
          </div>
          {toggleMenu && (
            <div className="app__cart-smallscreen_overlay flex__center slide-bottom">
              <MdOutlineRestaurantMenu fontSize={27} className="overlay__close" onClick={() => setToggleMenu(false)} />
              <div className='cart-section-small'>
                <Cart 
                  order={order} 
                  incrementQuantity={incrementCartQuantity} 
                  decrementQuantity={decrementCartQuantity} 
                  removeFromOrder={removeFromOrder} 
                />
                <p className='form_heading'>Your Info</p>
                <form className='form' onSubmit={saveCart}>
                  <div className='input-field'>
                    <input
                      required
                      type="text"
                      name="name"
                      id="username"
                      placeholder='Full name'
                      value={customerName}
                      onChange={(e) => setCustomerName(e.target.value)}
                    />
                  </div>
                  <div className='input-field'>
                    <input
                      required
                      type="tel"
                      name="mobile"
                      id="username"
                      placeholder='Mobile number'
                      value={phoneNumber}
                      onChange={(e) => setPhoneNumber(e.target.value)}
                    />
                  </div>
                  <div className='input-field'>
                    <input
                      required
                      type="text"
                      name="location"
                      id="username"
                      placeholder='Location'
                      value={deliveryAddress}
                      onChange={(e) => setDeliveryAddress(e.target.value)}
                    />
                  </div>
                  <button className="save-cart-button">Submit</button>
                </form>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default PartyOrder;
