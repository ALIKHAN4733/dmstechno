'use client'
import React, { useState } from 'react';
import './style.css';

const DepartmentChecklist: React.FC = () => {
  const [departmentName, setDepartmentName] = useState<string>('');
  const [pdfFile, setPdfFile] = useState<File | null>(null);
  const [status, setStatus] = useState<string>('pending');
  const [departmentData, setDepartmentData] = useState<{ department: string; pdf: string; status: string }[]>([]);

  const handleFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const existingRowIndex = departmentData.findIndex((data) => data.department === departmentName);

    if (existingRowIndex !== -1) {
      const newData = [...departmentData];
      newData[existingRowIndex] = { department: departmentName, pdf: pdfFile ? pdfFile.name : '', status };
      setDepartmentData(newData);
    } else {
      setDepartmentData([...departmentData, { department: departmentName, pdf: pdfFile ? pdfFile.name : '', status }]);
    }

    setDepartmentName('');
    setPdfFile(null);
    setStatus('pending');
  };

  return (
    <main className="main">
      <form id="departmentForm" onSubmit={handleFormSubmit}>
        <label htmlFor="departmentName">Department Name:</label>
        <input
          type="text"
          id="departmentName"
          name="departmentName"
          value={departmentName}
          onChange={(e) => setDepartmentName(e.target.value)}
        />
        <br />
        <label htmlFor="pdfFile">PDF File:</label>
        <input
          type="file"
          id="pdfFile"
          name="pdfFile"
          onChange={(e) => setPdfFile(e.target.files ? e.target.files[0] : null)}
        />
        <br />
        <label htmlFor="status">Status:</label>
        <select
          id="status"
          name="status"
          value={status}
          onChange={(e) => setStatus(e.target.value)}
        >
          <option value="pending">Pending</option>
          <option value="completed">Completed</option>
        </select>
        <br />
        <input type="submit" value="Add point" />
      </form>

      <table id="departmentTable">
        <thead>
          <tr>
            <th>Department</th>
            <th>PDF</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {departmentData.map((data, index) => (
            <tr key={index}>
              <td>{data.department}</td>
              <td>
                {data.pdf && (
                  <a href={data.pdf} target="_blank" rel="noopener noreferrer">
                    {data.pdf}
                  </a>
                )}
              </td>
              <td>{data.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </main>
  );
};

export default DepartmentChecklist;
