'use client'

import React, { useState } from 'react';
import './globals.css';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

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
        console.log(res);
        if (res.data === 'user logged in') {
          router.push('/home', { scroll: false });
          console.log('User logged in');
        }
      })
      .catch((err) => console.log(err));
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
