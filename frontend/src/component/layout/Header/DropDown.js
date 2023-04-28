import { useState } from "react";
import { Link } from "react-router-dom";


const Dropdown = () => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleOpen = () => {
        setIsOpen(true);
    }
    const toggleClose = () => {
        setIsOpen(false);
    }


    const menuClass = `dropdown-menu${isOpen ? " show" : ""}`;
    return (
        <li className="nav-item dropdown" onMouseEnter={toggleOpen} onMouseLeave={toggleClose}>
            <div className="nav-link dropdown-toggle" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                Dropdown
            </div>
            <div className={menuClass} aria-labelledby="navbarDropdown">
                <Link className="dropdown-item" to="#">Action</Link>
                <Link className="dropdown-item" to="#">Another action</Link>
                {/* <div className="dropdown-divider"></div> */}
                <Link className="dropdown-item" to="#">Something else here</Link>
            </div>
        </li>
    );

}
export default Dropdown;