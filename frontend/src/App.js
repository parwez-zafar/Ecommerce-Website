import { useEffect } from 'react';
import './App.css';
import Header from './component/layout/Header/Header'
import WebFont from "webfontloader";
import Footer from './component/layout/Footer/Footer';
import Home from './component/Home/Home.js'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// useEffect
function App() {

  useEffect(() => {
    WebFont.load({
      google: {
        families: ["Roboto", "Droid Sans", "Chilanka"],
      },
    });
  }, []);
  return (
    <>


      <Router>
        <Header />

        <Routes>
          <Route exact path='/' element={<Home />} />
        </Routes>



        <Footer />
      </Router>

    </>
  );
}

export default App;
