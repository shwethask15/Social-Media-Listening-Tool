import '../App.css';
import { NavLink } from 'react-router-dom';
import { FaBell, FaQuestionCircle } from 'react-icons/fa'; 

function Navbar() {
    return (
        <div className="navbar">
            <div className="navbar-brand">
                <h3>SOCIAL MEDIA LISTENING TOOL</h3>
            </div>
            <ul className="navbar-menu">
                <li><NavLink to="/page1">Analytics</NavLink></li>
                <li><NavLink to="/page2">Verbatims</NavLink></li>
            </ul>
            <div className="navbar-icons">
                <FaBell className="icon" />
                <FaQuestionCircle className="icon" />
            </div>
        </div>
    );
}

export default Navbar;
