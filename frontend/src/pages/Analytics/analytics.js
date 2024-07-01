import { Route, Routes, Navigate } from "react-router-dom";
import LiveTrendingVerbatims from "./Components/Live-Trending-Verbatims";
import TrendAnalysis from "./Components/Trend-Analysis";
import SnapshotView from "./Components/Snapshot-View";
import Navbar from "../Analytics/Components/Navbar";
import '../Analytics/style/Navbar.css'
import '../Analytics/style/smlShow.css'

import { Provider } from "react-redux";
import store from "./redux/store/store";

function Analytics() {


    return (
        <div className="analyticsBody">
            <Provider store={store}>
            <Navbar />
            <Routes>
                <Route path="/" element={<Navigate to="LiveTrendingVerbatims" /> } />
                <Route path="LiveTrendingVerbatims" element={<LiveTrendingVerbatims />} />
                <Route path="TrendAnalysis" element={<TrendAnalysis />} />
                <Route path="SnapshotView" element={<SnapshotView />} />
            </Routes>
            </Provider>
        </div>

    )
}

export default Analytics;