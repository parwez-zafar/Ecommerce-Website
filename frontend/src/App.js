import { useEffect, useState } from 'react';
import './App.css';
import Header from './component/layout/Header/Header'
import WebFont from "webfontloader";
import Footer from './component/layout/Footer/Footer';
import Home from './component/Home/Home.js'
import ProductDetails from './component/Product/ProductDetails';

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Products from './component/Product/Products';
// import Search from './component/Product/Search.js'
import LoginSignup from './component/User/LoginSignup';
import Profile from './component/User/Profile.js'
// import { useSelector } from 'react-redux';
import store from './store';
import { loadUser } from './actions/userAction';
import UpdateProfile from './component/User/UpdateProfile.js'
import UpdatePassword from './component/User/UpdatePassword.js'
import ForgotPassword from './component/User/ForgotPassword.js'
import ResetPassword from './component/User/ResetPassword.js'
import Cart from './component/Cart/Cart.js';
import Shipping from './component/Cart/Shipping.js';
import { ProtectedRoute } from './component/Route/ProtectedRoute';
import ConfirmOrder from './component/Cart/ConfirmOrder'
import axios from 'axios';
import Payment from './component/Cart/Payment.js'
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import OrderSuccess from './component/Cart/OrderSuccess.js'
import MyOrders from './component/Order/MyOrders.js'
import OrderDetails from './component/Order/OrderDetails.js'
import Dashboard from './component/Admin/Dashboard.js';
import ProductList from './component/Admin/ProductList.js'
import NewProduct from './component/Admin/NewProduct';
import UpdateProduct from './component/Admin/UpdateProduct.js'




// useEffect
function App() {


  // console.log("user -> ", user);

  const [stripeApiKey, setStripeApiKey] = useState();


  async function getStripeApiKey() {
    const { data } = await axios.get('/api/v1/stripeapikey');
    setStripeApiKey(data.stripeApiKey)
  }


  // const { isAuthenticated } = useSelector((state) => state.user);


  useEffect(() => {
    WebFont.load({
      google: {
        families: ["Roboto", "Droid Sans", "Chilanka"],
      },
    });
    store.dispatch(loadUser());
    getStripeApiKey();
  }, []);
  return (
    <>

      <Router>
        <Header />


        <Routes>


          <Route exact path='/' element={<Home />} />
          <Route exact path='/product/:id' element={<ProductDetails />} />
          <Route exact path='/products' element={<Products />} />
          <Route path='/products/:keyword' element={<Products />} />
          <Route exact path='/login' element={<LoginSignup />} />
          <Route exact path='/password/forgot' element={<ForgotPassword />} />
          <Route exact path='/password/reset/:token' element={<ResetPassword />} />
          <Route exact path='/cart' element={<Cart />} />



          {/* Protected Route */}
          <Route exact path='/account' element={<ProtectedRoute><Profile /></ProtectedRoute>} />
          <Route exact path='/me/update' element={<ProtectedRoute>  <UpdateProfile /></ProtectedRoute>} />
          <Route exact path='/password/update' element={<ProtectedRoute>  <UpdatePassword /></ProtectedRoute>} />
          <Route exact path='/shipping' element={<ProtectedRoute>  <Shipping /></ProtectedRoute>} />
          {
            stripeApiKey &&
            <Route exact path='/process/payment' element={<ProtectedRoute>  <Elements stripe={loadStripe(stripeApiKey)}> <Payment /></Elements></ProtectedRoute>} />
          }
          <Route exact path='/success' element={<ProtectedRoute>  <OrderSuccess /></ProtectedRoute>} />
          <Route exact path='/orders' element={<ProtectedRoute>  <MyOrders /></ProtectedRoute>} />
          <Route exact path='/orderDetail/:id' element={<ProtectedRoute>  <OrderDetails /></ProtectedRoute>} />
          <Route exact path='/order/confirm' element={<ProtectedRoute>  <ConfirmOrder /></ProtectedRoute>} />



          {/* Admin Route */}

          <Route exact path='/admin/dashboard' element={<ProtectedRoute isAdmin={true}>  <Dashboard /></ProtectedRoute>} />

          <Route exact path='/admin/products' element={<ProtectedRoute isAdmin={true}>  <ProductList /></ProtectedRoute>} />
          <Route exact path='/admin/product' element={<ProtectedRoute isAdmin={true}>   <NewProduct /> </ProtectedRoute>} />
          <Route exact path='/admin/product/:id' element={<ProtectedRoute isAdmin={true}>   <UpdateProduct /> </ProtectedRoute>} />












          {/* userRoute */}
          {/* {
            isAuthenticated && (
              <Route exact path='/account' element={<Profile />} />
            )
          }
          {
            isAuthenticated && (
              <Route exact path='/me/update' element={<UpdateProfile />} />
            )
          }

          {
            isAuthenticated && (
              <Route exact path='/password/update' element={<UpdatePassword />} />
            )
          }

          {
            isAuthenticated && (
              <Route exact path='/shipping' element={<Shipping />} />
            )
          }




          {
            isAuthenticated && stripeApiKey && (
              <Route exact path='/process/payment' element={<Elements stripe={loadStripe(stripeApiKey)}> <Payment /></Elements>} />
            )
          }

          {
            isAuthenticated && (
              <Route exact path='/success' element={<OrderSuccess />} />
            )
          }
          {
            isAuthenticated && (
              <Route exact path='/orders' element={<MyOrders />} />
            )
          }

          {
            isAuthenticated && (
              <Route exact path='/orderDetail/:id' element={<OrderDetails />} />
            )
          }
          {
            isAuthenticated && (
              <Route exact path='/order/confirm' element={<ConfirmOrder />} />
            )
          } */}

          {/* Admin Route */}
          {/* {
            isAuthenticated && (
              <Route exact path='/admin/dashboard' element={<Dashboard />} />
            )
          } */}
        </Routes>


        <Footer />
      </Router>

    </>
  );
}

export default App;
