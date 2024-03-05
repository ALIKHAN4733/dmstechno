'use client'

import React, { useState } from 'react';
import './style.css'; // Import your stylesheet

interface ObjectiveRowProps {
  objective: string;
}

const ObjectiveRow: React.FC<ObjectiveRowProps> = ({ objective }) => {
  const [done, setDone] = useState(false);
  const [remarks, setRemarks] = useState('');

  return (
    <tr>
      <td style={{ maxWidth: '60%', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{objective}</td>
      <td style={{ maxWidth: '20%' }}>
        <input
          type="checkbox"
          checked={done}
          onChange={() => setDone(!done)}
        />
      </td>
      <td style={{ maxWidth: '20%' }}>
        <textarea
          rows={2}
          value={remarks}
          onChange={(e) => setRemarks(e.target.value)}
          placeholder="Enter remarks..."
          style={{ width: '100%', boxSizing: 'border-box' }}
        />
      </td>
    </tr>
  );
};

const App: React.FC = () => {
  const [objectiveText, setObjectiveText] = useState('');
  const [objectives, setObjectives] = useState<string[]>([]);

  const setObjective = () => {
    setObjectives((prevObjectives) => [...prevObjectives, objectiveText]);
    setObjectiveText('');
  };

  return (
    <>
    <div className='main'>
      <div className='toph'>
        Quality Objectives
      </div>
      <div className='cont'>
      <table id="setObjectives">
        <thead>
          <tr>
            <th style={{ maxWidth: '500px' }}>Objective</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <textarea
                id="objective"
                rows={2}
                value={objectiveText}
                onChange={(e) => setObjectiveText(e.target.value)}
                placeholder="Enter your objective..."
                style={{ width: '100%', boxSizing: 'border-box' }}
              />
            </td>
          </tr>
        </tbody>
      </table>
      <button onClick={setObjective}>ADD</button>
      </div>

      <h2>Evaluate Objectives</h2>
      <div className='main'>
      <table id="evaluateObjectives">
        <thead>
          <tr>
            <th style={{ maxWidth: '60%' }}>Objective</th>
            <th style={{ maxWidth: '10%' }}>Done</th>
            <th style={{ maxWidth: '30%' }}>Remarks</th>
          </tr>
        </thead>
        <tbody>
          {objectives.map((objective, index) => (
            <ObjectiveRow key={index} objective={objective} />
          ))}
        </tbody>
      </table>
      </div>
      </div>
    </>
  );
};

export default App;
