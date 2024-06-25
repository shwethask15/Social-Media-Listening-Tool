import { Route, Routes } from 'react-router-dom';
import Analytics from './pages/Analytics/analytics';
import Verbatims from './pages/Verbatims/Verbatims';
import Navbar from './Components/Navbar';

function Home() {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="page1/*" element={<Analytics />} />
        <Route path="page2/*" element={<Verbatims />} />
      </Routes>
    </div>
  );
}

export default Home;
