"use client"
import React, { useState, ChangeEvent, useEffect } from 'react';
import Link from 'next/link';
import { EmbedPDF } from "@simplepdf/react-embed-pdf";
import './style.css';
import Router from 'next/router';
const Page = () => {
  // Handler for form submission
  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    // Add your form submission logic here
    console.log('Form submitted');
  };

  return (
    <div>
  
<div style={{ paddingLeft: '20px', paddingTop: '20px', paddingBottom: '20px'}}>
      <h1 >Internal audit</h1>
      <div id="doc">
        <form onSubmit={handleSubmit} style={{ paddingBottom: '20px' }}>
          <label htmlFor="sno">S.No:</label>
          <input type="text" id="sno" name="sno" />
          
          <label htmlFor="date">Date:</label>
          <input type="date" id="date" name="date" />
          
          <label htmlFor="month">Month:</label>
          <input type="text" id="month" name="month" />
          
          <label htmlFor="docReference">Document Reference:</label>
          <input type="text" id="docReference" name="docReference" />
          
          <label htmlFor="problemDescription">Problem Description:</label>
          <textarea id="problemDescription" name="problemDescription" />
          
          <label htmlFor="analyseReason">Analyse Reason:</label>
          <textarea id="analyseReason" name="analyseReason" />
          
          <label htmlFor="correctiveAction">Corrective Action:</label>
          <textarea id="correctiveAction" name="correctiveAction" />
          
          <label htmlFor="deadline">Deadline:</label>
          <input type="date" id="deadline" name="deadline" />
          
          <label htmlFor="responsiblePerson">Responsible Person:</label>
          <input type="text" id="responsiblePerson" name="responsiblePerson" />
          
          <label htmlFor="responsibleDepartment">Responsible Department:</label>
          <input type="text" id="responsibleDepartment" name="responsibleDepartment" />
          
          <label htmlFor="status">Status:</label>
          <input type="text" id="status" name="status" />
          
          <label htmlFor="followedBy">Followed By:</label>
          <input type="text" id="followedBy" name="followedBy" />

          <button type="submit">Submit</button>
        </form>
      </div>
    </div>
    </div>
  );
};

export default Page;
