import React, { useEffect, useState } from 'react';

import Header from './components/layouts/Header';
import { Routes, Route } from 'react-router-dom';
import './App.css';
import Footer from './components/layouts/Footer';
import Home from './components/Home';
import ProductDetails from './components/product/ProductDetails';

import Login from './components/user/Login';
import Register from './components/user/Register';
import ProtectedRoute from './components/route/ProtectedRoute';
import { loadUser } from './actions/userActions';
import store from './store';
import Profile from './components/user/Profile';
import UpdateProfile from './components/user/UpdateProfile';
import UpdatePassword from './components/user/UpdatePassword';
import ForgotPassword from './components/user/ForgotPassword';
import ResetPassword from './components/user/ResetPassword';
import Cart from './components/cart/Cart';
import Shipping from './components/cart/Shipping';
import ConfirmOrder from './components/cart/ConfirmOrder';
import axios from 'axios';
import Payment from './components/cart/Payment';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';

function App() {
  const [stripeApiKey, setStripeApiKey] = useState('');
  useEffect(() => {
    store.dispatch(loadUser());

    async function getStripeApiKey() {
      const { data } = await axios.get('/api/v1/stripeapi');
      setStripeApiKey(data.stripeApiKey);
    }

    getStripeApiKey();
  }, []);
  return (
    <div className="App">
      <Header />
      <div className="container container-fluid">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/search/:keyword" element={<Home />} />
          <Route path="/product/:id" element={<ProductDetails />} />
          <Route path="/login" element={<Login />} />
          <Route
            path="/me"
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            }
          />
          <Route
            path="/me/update"
            element={
              <ProtectedRoute>
                <UpdateProfile />
              </ProtectedRoute>
            }
          />
          <Route
            path="/password/update"
            element={
              <ProtectedRoute>
                <UpdatePassword />
              </ProtectedRoute>
            }
          />
          <Route
            path="/shipping"
            element={
              <ProtectedRoute>
                <Shipping />
              </ProtectedRoute>
            }
          />
          <Route
            path="/order/confirm"
            element={
              <ProtectedRoute>
                <ConfirmOrder />
              </ProtectedRoute>
            }
          />
          {stripeApiKey && (
            <Elements stripe={loadStripe(stripeApiKey)}>
              <ProtectedRoute path="/payment" element={<Payment />} />
            </Elements>
          )}

          <Route path="/password/forgot" element={<ForgotPassword />} />
          <Route path="/password/reset/:token" element={<ResetPassword />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </div>
      <Footer />
    </div>
  );
}
export default App;
