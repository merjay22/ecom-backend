import React, { useContext, useEffect, useState } from 'react';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import './PlaceOrder.css';
import { StoreContext } from '../../context/StoreContext';

const PlaceOrder = () => {

  const { product_list, url, token } = useContext(StoreContext);
  const navigate = useNavigate();
  const { orderNumber } = useParams();
  const { state } = useLocation();
  const [seconds, setSeconds] = useState(5);

  useEffect(() => {
    if (seconds > 0) {
      const timer = setTimeout(() => {
        setSeconds(seconds - 1);
      }, 1000);

      return () => clearTimeout(timer);
    } else {
      navigate('/');
    }

    if (!token) {
      navigate('/')
    }
  }, [seconds, navigate]);

  return (
    <div className="container">
      <div className="place-order">
        <h1>Thank You for Your Order!</h1>
        <p>Your order has been placed successfully.</p>
        <div className="order-number">
          Order Number: {orderNumber}
        </div>
        <div className="order-details">
          <h3>Order Details</h3>
          {state && state.orderData ? (
            <>
              <p>Amount: ₹{state.orderData.amount}</p>
              <ul>
                {state.orderData.items.map((item, index) => (
                  <li key={index}>{item.name} - {item.quantity} - ₹{item.price * item.quantity}</li>
                ))}
              </ul>
            </>
          ) : (
            <p>Loading order details...</p>
          )}
        </div>
        <p className="redirect-message">
          You will be redirected to the main page in <span>{seconds}</span> seconds.
        </p>
      </div>
    </div>
  );
};

export default PlaceOrder;
