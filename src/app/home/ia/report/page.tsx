'use client'
import React, { useState } from 'react';
import './style.css';

type ChecklistItem = {
  departmentName: string;
  items: string[];
};

const Page: React.FC = () => {
  const [departmentName, setDepartmentName] = useState('');
  const [checklistItem, setChecklistItem] = useState('');
  const [departments, setDepartments] = useState<ChecklistItem[]>([]);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const existingDepartment = departments.find(department => department.departmentName === departmentName);
    if (existingDepartment) {
      existingDepartment.items.push(...checklistItem.split(',').map(item => item.trim()));
      setDepartments([...departments]);
    } else {
      setDepartments([
        ...departments,
        { departmentName, items: checklistItem.split(',').map(item => item.trim()) },
      ]);
    }
    setDepartmentName('');
    setChecklistItem('');
  };

  return (
    <div>
      <h2>Internal Audit Report</h2>
      <form id="departmentForm" onSubmit={handleSubmit}>
        <label htmlFor="departmentName">Department Name:</label>
        <input
          type="text"
          id="departmentName"
          name="departmentName"
          value={departmentName}
          onChange={(e) => setDepartmentName(e.target.value)}
        />
        <br />
        <label htmlFor="checklistItem">Checklist Item:</label>
        <input
          type="text"
          id="checklistItem"
          name="checklistItem"
          value={checklistItem}
          onChange={(e) => setChecklistItem(e.target.value)}
        />
        <br />
        <input type="submit" value="Add point" />
      </form>
      <table id="departmentTable">
        <thead>
          <tr>
            <th>Department</th>
            <th>Checklist</th>
          </tr>
        </thead>
        <tbody>
          {departments.map((department, index) => (
            <tr key={index}>
              <td>{department.departmentName}</td>
              <td>
                <ul>
                  {department.items.map((item, itemIndex) => (
                    <li key={itemIndex}>
                      <input type="checkbox" /> {item}
                    </li>
                  ))}
                </ul>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Page;
