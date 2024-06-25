import React, { useState } from 'react';
import '../App.css';

function SignUp({ onSignUpSuccess }) {
  const [user_name, setUserName] = useState('');
  // const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [mobile_no, setMobileNo] = useState('');
  const [address, setAddress] = useState('');
  const [error, setError] = useState(null);

  const handleSignUp = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://127.0.0.1:8000/signup/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ "user_name":user_name, "password":password, "mobile_no":mobile_no, "address":address })
      });

      if (response.ok) {
        const data = await response.json();
        onSignUpSuccess();
      } else {
        const errorData = await response.json();
        setError(errorData.detail || 'Sign-up failed');
      }
    } catch (err) {
      setError('An error occurred. Please try again later.');
    }
  };

  return (
    <div>
      <h2>Sign Up</h2>
      <form onSubmit={handleSignUp}>
        <input
          type="text"
          placeholder="Username"
          value={user_name}
          onChange={(e) => setUserName(e.target.value)}
          required
        />
        {/* <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        /> */}
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Mobile Number"
          value={mobile_no}
          onChange={(e) => setMobileNo(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          required
        />
        {error && <p>{error}</p>}
        <button type="submit">Sign Up</button>
      </form>
    </div>
  );
}

export default SignUp;
