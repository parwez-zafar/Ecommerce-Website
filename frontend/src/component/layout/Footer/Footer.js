import React from 'react'
import playstore from '../../../images/playstore.png';
import appstore from '../../../images/Appstore.png';
// import { Link } from 'react-router-dom';
import './Footer.css';
import TwitterIcon from '@mui/icons-material/Twitter';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import InstagramIcon from '@mui/icons-material/Instagram';
const Footer = () => {
    return (
        <footer id='footer'>

            <div className="leftFooter">
                <h4>DOWNLOAD OUR APP</h4>
                <p>Download App for Android and IOS mobile Phone</p>
                <img src={playstore} alt="Playstore" />
                <img src={appstore} alt="Appstore" />
            </div>

            <div className="midFooter">
                <h1>Ecommerce</h1>
                <p>High Quality is our first priority</p>
                <p>Copyright 2023 &copy; prwzShop</p>
            </div>

            <div className="rightFooter">
                <h4>Follow Us</h4>


                <a href='https://www.linkedin.com/in/md-parwez-zafar-761b791b9/' target="_blank" rel="noopener noreferrer" >
                    <LinkedInIcon /> LinkedIn</a>
                <a href='https://twitter.com/158Zafar' target="_blank" rel="noopener noreferrer" > <TwitterIcon /> Twitter</a>
                <a href='https://www.instagram.com/parwez.zafar.737/' target="_blank" rel="noopener noreferrer" > <InstagramIcon /> Instagram</a>

            </div>

        </footer >
    )
}

export default Footer