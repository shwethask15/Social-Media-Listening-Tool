import { Route, Router, Routes, Navigate } from "react-router-dom";
import LiveTrendingVerbatims from "./Components/Live-Trending-Verbatims";
import TrendAnalysis from "./Components/Trend-Analysis";
import SnapshotView from "./Components/Snapshot-View";
import Navbar from "../Analytics/Components/Navbar";
import '../Analytics/style/Navbar.css'

function Analytics() {


    return (
        <div>
            <Navbar />
            <Routes>
            
                <Route path="/" element={<Navigate to="LiveTrendingVerbatims" /> } />
                <Route path="LiveTrendingVerbatims" element={<LiveTrendingVerbatims />} />
                <Route path="TrendAnalysis" element={<TrendAnalysis />} />
                <Route path="SnapshotView" element={<SnapshotView />} />
            </Routes>
        </div>

    )
}

export default Analytics;