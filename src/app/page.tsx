'use client'

import React, { useState } from 'react';
import './globals.css';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Cookies from 'js-cookie';


function App() {
  const [usernameLog, setusername] = useState('');
  const [passwordLog, setPassword] = useState('');
  const router = useRouter();
  const router1 = useRouter();

  const handleResetClick = () => {
    router1.push('/resetpass');
  };

  const login = () => {
    axios({
      method: 'post',
      data: {
        username: usernameLog,
        password: passwordLog,
      },
      withCredentials: true,
      url: 'http://localhost:3001/login', // Update the endpoint to '/login'
    })
    .then((res) => {
      console.log('Response from server:', res.data);
      if (res.data.message === 'user logged in' && res.data.userData) {
        // Storing the user data in SessionStorage
        sessionStorage.setItem('userData', JSON.stringify(res.data.userData));
        Cookies.set('loggedin', 'true') ;
  
        // Redirect to the home page
        router.push('/home', { scroll: false });
        console.log('User logged in and data stored in SessionStorage');
      } else {
        // Log the error or message from server if login was not successful
        console.log(res.data.message || 'Login was not successful.');
      }
    })
    .catch((err) => {
      console.error('Login error:', err);
      // You may want to show the user an error message here
    });
  };
  

  return (
    <div className='login'>
      <header>
        <div className='login_top'>
          <h1>DMS Login Portal</h1>
        </div>
        <div className='content_pad'>
          <form className='form'>
            <p>
              <label htmlFor='username'>Username</label>
              <input
                type='username'
                id='username'
                placeholder='username'
                onChange={(e) => setusername(e.target.value)}
                required
              />
            </p>
            <p>
              <label htmlFor='password'>Password</label>
              <input
                type='password'
                id='password'
                placeholder='password'
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </p>
          </form>

          <h2 style={{ color: 'purple', fontSize: '12px', textAlign: 'right', paddingTop: '8px' }}>
            <u style={{ cursor: 'pointer' }} onClick={handleResetClick}>
              Reset Password
            </u>
          </h2>

          <div className='actions'>
            <button onClick={login}>Login</button>
          </div>
        </div>
      </header>
    </div>
  );
}

export default App;
