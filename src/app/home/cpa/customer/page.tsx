'use client'

import React from 'react';
import Link from "next/link";
import './style.css';

interface Complaint {
  customerName: string;
  customerEmail: string;
  complaintCategory: string;
  complaintDetails: string;
}

const ComplaintForm: React.FC = () => {
  const submitComplaint = () => {
    const customerName = (document.getElementById('customerName') as HTMLInputElement)?.value;
    const customerEmail = (document.getElementById('customerEmail') as HTMLInputElement)?.value;
    const complaintCategory = (document.getElementById('complaintCategory') as HTMLSelectElement)?.value;
    const complaintDetails = (document.getElementById('complaintDetails') as HTMLTextAreaElement)?.value;

    // Validate that all fields are filled
    if (!customerName || !customerEmail || !complaintCategory || !complaintDetails) {
      alert('Please fill in all fields.');
      return;
    }

    // Create an object with complaint data
    const complaint: Complaint = {
      customerName: customerName,
      customerEmail: customerEmail,
      complaintCategory: complaintCategory,
      complaintDetails: complaintDetails,
    };

    // Add the complaint to the list
    addComplaintToList(complaint);

    // Optionally, you can reset the form after submission
    const form = document.getElementById('complaintForm') as HTMLFormElement;
    form.reset();
  };

  const addComplaintToList = (complaint: Complaint) => {
    const complaintsList = document.getElementById('complaints');

    // Create a list item for the complaint
    const listItem = document.createElement('li');
    listItem.classList.add('complaint');
    listItem.innerHTML =
      '<p><strong>Name:</strong> ' +
      complaint.customerName +
      '</p>' +
      '<p><strong>Email:</strong> ' +
      complaint.customerEmail +
      '</p>' +
      '<p><strong>Category:</strong> ' +
      complaint.complaintCategory +
      '</p>' +
      '<p><strong>Details:</strong> ' +
      complaint.complaintDetails +
      '</p>';

    // Add the list item to the complaints list
    complaintsList?.appendChild(listItem);
  };

  return (
    <>
      <div className='toph'>Customer Complaint Form
      </div>

      <form id="complaintForm">
        <label htmlFor="customerName">Customer Name:</label>
        <input type="text" id="customerName" name="customerName" required />

        <label htmlFor="customerEmail">Customer Email:</label>
        <input type="email" id="customerEmail" name="customerEmail" required />

        <label htmlFor="complaintCategory">Complaint Category:</label>
        <select id="complaintCategory" name="complaintCategory" required>
          <option value="" disabled selected>
            Select a category
          </option>
          <option value="Product">Product</option>
          <option value="Service">Service</option>
          <option value="Delivery">Delivery</option>
          <option value="Other">Other</option>
        </select>

        <label htmlFor="complaintDetails">Complaint Details:</label>
        <textarea id="complaintDetails" name="complaintDetails" rows={4} required></textarea>

        <button type="button" onClick={submitComplaint}>
          Submit Complaint
        </button>
      </form>

      <div className="complaint-list" id="complaintList">
        <h2>Submitted Complaints</h2>
        <ul id="complaints"></ul>
      </div>
    </>
  );
};

export default ComplaintForm;
