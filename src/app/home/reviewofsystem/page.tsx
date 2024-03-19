'use client'

import './style.css';
import { useState, useEffect } from 'react';
import axios from 'axios';
import Link from "next/link";
import { useRouter } from 'next/navigation';

const ReviewOfSystemDocument = () => {
    return (
      <>

        <main>
          <h2> Review Of System Documents </h2>
          <ul>
           
            <li>
              <Link href={'reviewofsystem/admin'}>
             <p>Admin</p>
              </Link>
            </li>
            <li>
              <Link href={'reviewofsystem/engierop'}>
             <p>Engineering Operations</p>
              </Link>
            </li>
            <li>
              <Link href={'reviewofsystem/hr'}>
             <p>Human Resource</p>
              </Link>
            </li>
            <li>
              <Link href={'reviewofsystem/planteng'}>
               <p>Plant Engineering</p>
              </Link>
            </li>
            <li>
              <Link href={'reviewofsystem/production'}>
               <p>Production</p>
              </Link>
            </li>
            <li>
              <Link href={'reviewofsystem/qm'}>
            <p>Quality Management</p>
              </Link>
            </li>
            <li>
              <Link href={'reviewofsystem/security'}>
               <p>Security</p>
              </Link>
            </li>
            <li>
              <Link href={'reviewofsystem/supply'}>
                <p>Supply Chain</p>
              </Link>
            </li>
          </ul>
        </main>
      </>
    )
  }
  
  export default ReviewOfSystemDocument;