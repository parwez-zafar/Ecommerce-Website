import { useEffect } from 'react';
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
import { useSelector } from 'react-redux';
import store from './store';
import { loadUser } from './actions/userAction';




// useEffect
function App() {


  // console.log("user -> ", user);


  const { user } = useSelector((state) => state.user);


  useEffect(() => {
    WebFont.load({
      google: {
        families: ["Roboto", "Droid Sans", "Chilanka"],
      },
    });
    store.dispatch(loadUser());

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


          <Route exact path='/account' element={<Profile />} />

          <Route exact path='/login' element={<LoginSignup />} />
        </Routes>


        <Footer />
      </Router>

    </>
  );
}

export default App;
