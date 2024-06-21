import { NavLink } from 'react-router-dom';
import { FaBell, FaQuestionCircle } from 'react-icons/fa'; 
import '../style/Navbar.css'

function Navbar() {
    return (
        <div className="navbar-analytics">
            <ul className="navbar-menu-analytics">
                <li><NavLink to="LiveTrendingVerbatims">Live Trending Verbatims</NavLink></li>
                <li><NavLink to="TrendAnalysis">Trend Analysis</NavLink></li>
                <li><NavLink to="SnapshotView">Snapshot View</NavLink></li>
            </ul>

        </div>
    );

}

export default Navbar;