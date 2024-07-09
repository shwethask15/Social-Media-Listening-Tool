import { Route, Routes, Navigate } from "react-router-dom";
import LiveTrendingVerbatims from "./Components/LiveTrendingVerbatims";
import TrendAnalysis from "./Components/TrendAnalysis";
import SnapshotView from "./Components/SnapshotView";
import Navbar from "../Analytics/Components/Navbar";
import '../Analytics/style/Navbar.css'
import '../Analytics/style/Analytics.css'

function Analytics() {
    return (
        <div className="analyticsBody">
            <Navbar />
            <Routes>
                <Route path="/" element={<Navigate to="live-trending-verbatims" /> } />
                <Route path="live-trending-verbatims" element={<LiveTrendingVerbatims />} />
                <Route path="trend-analysis" element={<TrendAnalysis />} />
                <Route path="snapshot-view" element={<SnapshotView />} />
            </Routes>
        </div>
    )
}

export default Analytics;