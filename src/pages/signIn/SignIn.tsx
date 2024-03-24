import React, { useState } from 'react';
import { useAuth } from '../../auth/AuthProvider';
import './SignIn.css';

const SignIn = () => {
  const { signIn } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    try {
      signIn();
    } catch (error) {
      setError('Failed to sign in. Please check your credentials.');
    }1
  };

  return (
    <div className="sign-in-container">
      <div className="sign-in-form">
        <h2 className="sign-in-heading">DLS Admin</h2>
        <h2>Sign In</h2>
        <form onSubmit={handleSubmit}>
          <div>
            <label>Email:</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div>
            <label>Password:</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit">Sign In</button>
        </form>
        {error && <div>{error}</div>}
      </div>
    </div>
  );
};

export default SignIn;
