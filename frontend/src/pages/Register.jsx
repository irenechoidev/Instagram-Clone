import React, { useState } from 'react';
import './css/register.css';

const Register = () => {
  const [username, setUsername] = useState();
  const [password, setPassword] = useState();
  return (
    <div className='register-container'>
      <form className='register-form-container'>
        <h3>Welcome to Instagram</h3>

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

        <button>Register</button>
      </form>
    </div>
  );
};

export default Register;
