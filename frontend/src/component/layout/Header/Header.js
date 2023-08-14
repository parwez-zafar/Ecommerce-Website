import { Link } from "react-router-dom";
// import Dropdown from "./DropDown";
import { useState } from "react";
// import { AiOutlineSearchs } from 'react-icons/fa';
// import { AiOutlineSearch } from "react-icons/ai";
// import { CgProfile } from "react-icons/cg";
import logo from '../../../images/logo.png';
import './header.css';
import { useNavigate } from 'react-router-dom';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import UserOptions from "./UserOptions";
import { useSelector } from "react-redux";
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';


const Header = () => {
    const [showCollapsedMenu, setshowCollapsedMenu] = useState(false);
    const { isAuthenticated, user } = useSelector((state) => state.user);


    const toggleMenu = () => {
        setshowCollapsedMenu(!showCollapsedMenu);
    }
    const show = (showCollapsedMenu) ? "show" : "";

    const [keyword, setKeyword] = useState("");
    const navigate = useNavigate();
    const searchSubmitHandler = (e) => {
        e.preventDefault();
        if (keyword && keyword.trim()) {
            navigate(`/products/${keyword}`);
            setKeyword("")
        }
        else {
            navigate('/products');
        }
    }


    return (
        <>
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <Link className="navbar-brand" to="/">
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
                            <Link className="nav-link" to="/">Home</Link>
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
                    <form className=" my-2 my-lg-0 d-flex" onSubmit={searchSubmitHandler}>

                        <input className="col-lg" type="text" placeholder='Search a Product ...' aria-label="Search" value={keyword}
                            onChange={(e) => setKeyword(e.target.value)}
                        />
                        <input className="btn " type="submit" value="search" />

                    </form>
                    <ul className="navbar-nav">
                        {
                            isAuthenticated ? <UserOptions className="userOption" user={user} /> :

                                <li className="nav-item active">


                                    <Link className="nav-link" to="/login"> <AccountCircleIcon /> </Link>

                                </li>
                        }

                        <li className="nav-item">
                            <Link className="nav-link" to="/cart"><div style={{ display: 'flex', width: '5vmax' }}> <ShoppingCartIcon /> {" Cart"}</div></Link>
                        </li>

                    </ul>

                </div>


            </nav>
        </>
    );
}

export default Header;