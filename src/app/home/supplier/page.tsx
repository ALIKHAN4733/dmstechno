'use client'
import React, { useState } from 'react';
import './style.css';

type Evaluation = {
  supplierName: string;
  remarks: string;
  rating: string;
};

const Page: React.FC = () => {
  const [supplierName, setSupplierName] = useState('');
  const [remarks, setRemarks] = useState('');
  const [rating, setRating] = useState('5'); // Default to "Excellent"
  const [evaluatedSuppliers, setEvaluatedSuppliers] = useState<Evaluation[]>([]);

  const submitEvaluation = () => {
    if (!supplierName || !remarks || !rating) {
      alert('Please fill in all fields.');
      return;
    }

    const evaluation: Evaluation = { supplierName, remarks, rating };
    setEvaluatedSuppliers([...evaluatedSuppliers, evaluation]);

    // Clear the form fields
    setSupplierName('');
    setRemarks('');
    setRating('5');
  };

  return (
    <div>
      

      <h1>Supplier Evaluation Form</h1>

      <form id="supplierForm">
        <label htmlFor="supplierName">Supplier Name:</label>
        <input
          type="text"
          id="supplierName"
          name="supplierName"
          required
          value={supplierName}
          onChange={(e) => setSupplierName(e.target.value)}
        />

        <label htmlFor="remarks">Remarks:</label>
        <textarea
          id="remarks"
          name="remarks"
          rows={4}
          required
          value={remarks}
          onChange={(e) => setRemarks(e.target.value)}
        />

        <label htmlFor="rating">Rating:</label>
        <select
          id="rating"
          name="rating"
          required
          value={rating}
          onChange={(e) => setRating(e.target.value)}
        >
          <option value="5">Excellent</option>
          <option value="4">Good</option>
          <option value="3">Average</option>
          <option value="2">Below Average</option>
          <option value="1">Poor</option>
        </select>

        <button type="button" onClick={submitEvaluation}>Submit Evaluation</button>
      </form>

      <h1>Evaluated Suppliers</h1>

      <ul id="evaluatedSuppliersList">
        {evaluatedSuppliers.map((evaluation, index) => (
          <li key={index}>
            <p><strong>Supplier:</strong> {evaluation.supplierName}</p>
            <p><strong>Remarks:</strong> {evaluation.remarks}</p>
            <p><strong>Rating:</strong> {evaluation.rating}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Page;
