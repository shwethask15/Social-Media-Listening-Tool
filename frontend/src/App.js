import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Analytics from './pages/Analytics/analytics';
import Verbatims from './pages/Verbatims/Verbatims';
import Navbar from './Components/Navbar';
import SignIn from './Components/SignIn';
import SignUp from './Components/SignUp';
import './App.css';

function App() {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  return (
    <Router>      
      {isAuthenticated && <Navbar />}
      <Routes>
        {!isAuthenticated ? (
          <>
            <Route path="/login" element={<SignIn />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="*" element={<Navigate to="/login" />} />
          </>
        ) : (
          <>
            <Route path="/" element={<Navigate to="/analytics" />} />
            <Route path="/analytics/*" element={<Analytics />} />
            <Route path="/verbatims/*" element={<Verbatims />} />
            <Route path="*" element={<Navigate to="/analytics" />} />
          </>
        )}
      </Routes>
    </Router>
  );
}

export default App;
