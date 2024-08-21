import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './PartyOrder.css';
import Cart from './Cart';
import { toast } from 'react-toastify';
import { url } from '../../assets/assets';


const categories = [
  { name: 'All', image: 'https://via.placeholder.com/50' },
  { name: 'Main', image: 'https://via.placeholder.com/50' },
  { name: 'Sides', image: 'https://via.placeholder.com/50' },
  { name: 'Drinks', image: 'https://via.placeholder.com/50' },
];

const PartyOrder = () => {
  const [category, setCategory] = useState('All');
  const [quantity, setQuantity] = useState({});
  const [order, setOrder] = useState([]);
  const [discount, setDiscount] = useState(0);

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



  const [foodItems, setList] = useState([]);

  const fetchFoodList = async () => {
    const response = await axios.get(`${url}/api/food/list`);
    if (response.data.success) {
      setList(response.data.data);
    } else {
      toast.error("Error");
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
    ? foodItems 
    : foodItems.filter(item => item.category === category);

  const saveCart = async (event) => {
    event.preventDefault();
    const { total, discountAmount, finalPrice } = calculateTotalPrice();
    try {
      const response = await axios.post(`${url}/api/cart/addcart`, { 
        order, 
        total: parseFloat(total), 
        discount: parseFloat(discountAmount), 
        finalPrice: parseFloat(finalPrice) 
      });
      if (response.data.success) {
        toast.success("Order received! Thank You", response.data.message);
        setOrder([]);  // Reset the cart
        setQuantity({}); // Reset the quantity state
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

      <div className="categories">
            {categories.map(cat => (
              <button
                key={cat.name}
                className={`category-button ${cat.name === category ? 'active' : ''}`}
                onClick={() => setCategory(cat.name)}
              >
                <img src={cat.image} alt={cat.name} width="30" />
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
                  <h4>{item.name}</h4>
                  <p>OMR : {item.price}</p>
                  <div className="quantity-control">
                    <button onClick={() => decrementItemQuantity(item.name)}>-</button>
                    <span>{quantity[item.name] || 1}</span>
                    <button onClick={() => incrementItemQuantity(item.name)}>+</button>
                  </div>
                  <button className='icon-btn add-btn' onClick={() => addToOrder(item)}>
                  <div className="add-icon"></div>
                  <div className="btn-txt">Add to cart</div>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className='cart-section' >
          <Cart 
            order={order} 
            incrementQuantity={incrementCartQuantity} 
            decrementQuantity={decrementCartQuantity} 
            removeFromOrder={removeFromOrder} 
          />
          
         
          <button className="save-cart-button" onClick={saveCart}>Save Cart</button>
        </div>
      </div>
    </div>
  );
}



export default PartyOrder
