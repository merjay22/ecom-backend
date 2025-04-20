import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import '../Payment/payment.css';
import { toast } from 'react-toastify';
import axios from 'axios';

const Payment = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const orderData = location.state?.orderData;

  if (!orderData) {
    toast.error("No order data found. Redirecting to home.");
    navigate('/');
    return null;
  }

  const handlePayment = async () => {
    try {
      const response = await axios.post('/api/payment/process', {
        orderNumber: orderData.orderNumber,
        amount: orderData.amount
      });

      if (response.data.success) {
        toast.success("Payment successful!");
        navigate(`/order-confirmation/${orderData.orderNumber}`);
      } else {
        toast.error("Payment failed. Please try again.");
      }
    } catch (error) {
      console.error(error);
      toast.error("Error processing payment.");
    }
  };

  return (
    <div className="payment-container">
      <h2>Payment Page</h2>
      <p>Order Number: {orderData.orderNumber}</p>
      <p>Total Amount: ₹ {orderData.amount}</p>
      <button onClick={handlePayment} className="pay-now-btn">Pay Now</button>
    </div>
  );
};

export default Payment;
