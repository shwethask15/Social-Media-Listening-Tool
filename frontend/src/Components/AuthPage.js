import React, { useState } from 'react';
import SignIn from './SignIn';
import SignUp from './SignUp';
import App from '../App'
import HomePage from './HomePage';

function AuthPage() {
  const [isSignIn, setIsSignIn] = useState(false);
  const [token, setToken] = useState(localStorage.getItem('authToken'));

  const handleAuthSuccess = (token) => {
    setToken(token);
    localStorage.setItem('authToken', token); // Store token in localStorage
  };

  const handleSignUpSuccess = () => {
    setIsSignIn(true);
  };

  return (
    <div>
      {token ? (
         <div className='App'>
        <App />
        </div>
      ) : (
        <>
          <button onClick={() => setIsSignIn(!isSignIn)}>
            {isSignIn ? 'Switch to Sign Up' : 'Switch to Sign In'}
          </button>
          {isSignIn ? (
            <SignIn onAuthSuccess={handleAuthSuccess} />
          ) : (
            <SignUp onSignUpSuccess={handleSignUpSuccess} />
          )}
        </>
      )}
    </div>
  );
}

export default AuthPage;
