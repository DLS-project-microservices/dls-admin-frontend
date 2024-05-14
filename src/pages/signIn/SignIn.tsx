import React, { useState } from 'react';
import './SignIn.css';
import axios from 'axios';
import useSignIn from 'react-auth-kit/hooks/useSignIn';
import { useNavigate } from 'react-router-dom';

const SignIn = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const signIn = useSignIn()

  const handleSubmit = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:5000/api/users/signin", {
        email: email,
        password: password,
        frontendUserType: "admin"
      });
      signIn({
        auth: {
          token: response.data.token,
          type: "bearer",
       },
        userState: {
          firstName: response.data.firstName,
          lastName: response.data.lastName,
          email: response.data.email,
          useType: response.data.userType,
          userRole: response.data.role
        }
      });
      navigate('/');
    } catch (error: any) {
      setError(error.response.data.error || 'Failed to sign in. Please check your credentials.');
    }
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
