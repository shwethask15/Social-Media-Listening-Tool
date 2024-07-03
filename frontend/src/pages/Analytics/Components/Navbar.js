import { NavLink } from 'react-router-dom';
import { FaBell } from 'react-icons/fa'; 
import '../style/Navbar.css'

function Navbar() {
    return (
        <div className="navbar-analytics">
            <ul className="navbar-menu-analytics">
                <li><NavLink to="live-trending-verbatims">LIVE TRENDING VERBATIMS</NavLink></li>
                <li><NavLink to="trend-analysis">TREND ANALYSIS</NavLink></li>
                <li><NavLink to="snapshot-view">SNAPSHOT VIEW</NavLink></li>
            </ul>

        </div>
    );

}

export default Navbar;