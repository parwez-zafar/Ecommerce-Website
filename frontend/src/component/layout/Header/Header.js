import { Link } from "react-router-dom";
// import Dropdown from "./DropDown";
import { useState } from "react";
// import { AiOutlineSearchs } from 'react-icons/fa';
import { AiOutlineSearch } from "react-icons/ai";
// import { CgProfile } from "react-icons/cg";
import logo from '../../../images/logo.png';
import './header.css';

const Header = () => {
    const [showCollapsedMenu, setshowCollapsedMenu] = useState(false);
    const toggleMenu = () => {
        setshowCollapsedMenu(!showCollapsedMenu);
    }
    const show = (showCollapsedMenu) ? "show" : "";
    return (
        <>
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <Link className="navbar-brand" to="#">
                    <img className="logo" src={logo} alt="Logo" />
                </Link>
                <button
                    className="navbar-toggler"
                    type="button"
                    onClick={toggleMenu}    // <=
                    data-toggle="collapse"
                    data-target="#navbarNav">
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className={"collapse navbar-collapse " + show} id="navbarSupportedContent">
                    <ul className="navbar-nav mr-auto navul">
                        <li className="">
                            <Link className="nav-link" to="/">Home <span className="sr-only">(current)</span></Link>
                        </li>
                        <li className="">
                            <Link className="nav-link" to="/products">Products</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/contact">Contact</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/about">About</Link>
                        </li>
                        {/* <Dropdown /> */}

                    </ul>
                    <div className="form-inline my-2 my-lg-0 d-flex">
                        <input className="form-control" type="search" placeholder="Search" aria-label="Search" />
                        <button className="btn " type="submit"> <AiOutlineSearch /> </button>

                    </div>
                    <ul className="navbar-nav">
                        {/* <li className="nav-item active">
                            <Link className="nav-link" to=""><CgProfile /> <span className="sr-only">(current)</span></Link>
                        </li> */}
                        {/* <li className="nav-item">
                            <Link className="nav-link profile-logo" to="#"><CgProfile /></Link>
                        </li> */}
                        {/* <li className="nav-item">
                            <Link className="nav-link" to="#">Contact</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="#">About</Link>
                        </li> */}
                    </ul>
                </div>
            </nav>
        </>
    );
}

export default Header;