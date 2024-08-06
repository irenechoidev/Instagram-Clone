import React, { useState } from 'react';
import './css/login.css';

const Login = () => {
  const [username, setUsername] = useState();
  const [password, setPassword] = useState();

  return (
    <div className='login-container'>
      <form className='login-form-container'>
        <h3>Welcome to Instagram!</h3>

        <input
          type='text'
          placeholder='username'
          onChange={(e) => setUsername(e.target.value)}
          value={username}
          required
        />

        <input
          type='password'
          placeholder='password'
          onChange={(e) => setPassword(e.target.value)}
          value={password}
          required
        />

        <button>Log in</button>
      </form>
    </div>
  );
};

export default Login;
