import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Analytics from './pages/Analytics/analytics';
import Verbatims from './pages/Verbatims/Verbatims';
import Navbar from './Components/Navbar';

function App() {
  return (
    <Router>
      <div className='App'>
        <Navbar />
        <Routes>
          <Route path="/" element={<Navigate to="/page1" />} /> 
          <Route path="/page1/*" element={<Analytics />} /> 
          <Route path="/page2/*" element={<Verbatims />} />
          <Route path="*" element={<Navigate to="/page1" />} /> 
        </Routes>
      </div>
    </Router>
  );
}

export default App;
