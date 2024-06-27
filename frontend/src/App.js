import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Analytics from './pages/Analytics/analytics';
import Verbatims from './pages/Verbatims/Verbatims';
import Navbar from './Components/Navbar';
import SignIn from './Components/SignIn';
import SignUp from './Components/SignUp';

function App() {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  return (
    <Router>
      <div className='App'>
        {isAuthenticated && <Navbar />}
        <Routes>
          {!isAuthenticated ? (
            <>
              <Route path="/login" element={<SignIn />} />
              <Route path="/signup" element={<SignUp />} />
              <Route path="*" element={<Navigate to="/signup" />} />
            </>
          ) : (
            <>
              <Route path="/" element={<Navigate to="/page1" />} />
              <Route path="/page1/*" element={<Analytics />} />
              <Route path="/page2/*" element={<Verbatims />} />
              <Route path="*" element={<Navigate to="/page1" />} />
            </>
          )}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
