'use client'

import React from 'react';
import './globals.css'; 
import axios from 'axios';
import { useRouter } from 'next/navigation'
import Link from 'next/link';

function App() {
  return (
    <div className='login'>
      <header>
        <div className='login_top'>
          <h1>Reset Password</h1>
        </div>
        <div className='content_pad'>
          <form className='form'>
            <p>
              <label htmlFor='username'>Username</label>
              <input
                type='text'
                id='username'
                placeholder='Username'
                required
              />
            </p>
          </form>
          <Link href={'/'}>
          <div className='actions'>
            <button>RESET</button>
          </div>
          </Link>
        </div>
      </header>
    </div>
  );
}

export default App;
