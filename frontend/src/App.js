import React, { useEffect } from 'react';

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

function App() {
  useEffect(() => {
    store.dispatch(loadUser());
  }, []);
  return (
    <div className="App">
      <Header />
      <div className="container container-fluid">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/cart" element={<Cart/>} />
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
