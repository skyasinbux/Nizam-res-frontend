import React from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { url } from "../../assets/assets";


function Cart({ order, incrementQuantity, decrementQuantity, removeFromOrder }) {
  const [discount, setDiscounts] = useState(0);

  

  const fetchList = async () => {
    try {
      const response = await axios.get(`${url}/api/discount/list`);
      setDiscounts(response.data); // The response is now an array of discounts
    } catch (error) {
      toast.error('Error fetching discount list');
    }

  };
  useEffect(() => {
    fetchList();
  }, []);

  


    const calculateTotalPrice = () => {
        const total = order.reduce((sum, item) => sum + item.price * item.quantity, 0);
        const discountAmount = total * (discount / 100);
        return {
          total: total.toFixed(3),
          discountAmount: discountAmount.toFixed(3),
          finalPrice: (total - discountAmount).toFixed(3),
        };
      };
    
      const { total, discountAmount, finalPrice } = calculateTotalPrice();


  return (
    <div className="cart">
      <ul>
        {order.map((item, index) => (
          <li className='cart-li' key={index}>

            <img src={`${url}/images/` + item.image} alt={item.name} width="30" />

            <span>{item.food} - OMR {item.price.toFixed(3) * item.quantity}</span>
            <div className="cart-quantity-control">
              <button onClick={() => decrementQuantity(index)}>-</button>
              <span>{item.quantity}</span>
              <button onClick={() => incrementQuantity(index)}>+</button>
            </div>
            <button className="remove-button" onClick={() => removeFromOrder(index)}>Remove</button>
          </li>
        ))}
      </ul>
      <div className="cart-summary">
            <h4>Total: OMR : {total}</h4>

            <h4>Discount: OMR : {discountAmount} ({discount}%)</h4>
            
            <h3>Final Price: OMR : {finalPrice}</h3>

      </div>
      
    </div>
  );
}

export default Cart;
