import React from 'react';
import Link from "next/link";

const InternalAudit: React.FC = () => {
  return (
    <main className="main">
      <h1>Internal Audit</h1>
      <ul>
        <Link href={'ia/plan'}>
        <li>
          <p style={{ textDecoration: 'none', color: '#212121' }}>Annual Internal Audit Plan</p>
        </li>
        </Link>
        <Link href={'ia/checklist'}>
        <li>
          <p style={{ textDecoration: 'none', color: '#212121' }}>Internal Audit Checklist</p>
        </li>
        </Link>
        <Link href={'ia/report'}>
        <li>
          <p style={{ textDecoration: 'none', color: '#212121' }}>Internal Audit Reports</p>
        </li>
        </Link>
        <Link href={'ia/status'}>
        <li>
          <p style={{ textDecoration: 'none', color: '#212121' }}>Internal Audit NC Forms and Status</p>
        </li></Link>
        
      </ul>
    </main>
  );
};

export default InternalAudit;
