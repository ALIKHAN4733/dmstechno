'use client'
import React, { useState } from 'react';
import './style.css';

const MeetingForm: React.FC = () => {
  const [meetingTitle, setMeetingTitle] = useState<string>('');
  const [meetingDateTime, setMeetingDateTime] = useState<string>('');
  const [actionPoints, setActionPoints] = useState<string>('');
  const [actionPointsList, setActionPointsList] = useState<string[]>([]);

  const addActionPoint = () => {
    if (actionPoints.trim() !== '') {
      setActionPointsList(prevList => [...prevList, actionPoints]);
      setActionPoints('');
    }
  };

  const scheduleMeeting = () => {
    console.log('Meeting Title:', meetingTitle);
    console.log('Meeting Date and Time:', meetingDateTime);
    console.log('Action Points:', actionPointsList);

  };

  return (
    <>
    <div className='toph'>Management Meeting</div>
    <div className='main'>
    <form id="meetingForm">
      <div className='container'>
      <label htmlFor="meetingTitle">Meeting Title:</label>
      <input
        type="text"
        id="meetingTitle"
        name="meetingTitle"
        value={meetingTitle}
        onChange={(e) => setMeetingTitle(e.target.value)}
        required
      />

      <label htmlFor="meetingDateTime">Meeting Date and Time:</label>
      <input
        type="datetime-local"
        id="meetingDateTime"
        name="meetingDateTime"
        value={meetingDateTime}
        onChange={(e) => setMeetingDateTime(e.target.value)}
        required
      />

      <label htmlFor="actionPoints">Action Points:</label>
      <textarea
        id="actionPoints"
        name="actionPoints"
        rows={4}
        value={actionPoints}
        onChange={(e) => setActionPoints(e.target.value)}
      ></textarea>

      <button type="button" onClick={addActionPoint}>
        Add Action Point
      </button>
      </div>

      <table id="actionPointsTable">
        <thead>
          <tr>
            <th>#</th>
            <th>Action Point</th>
          </tr>
        </thead>
        <tbody>
          {actionPointsList.map((point, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{point}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <button type="button" onClick={scheduleMeeting}>
        Schedule Meeting
      </button>
    </form>
    </div>
    </>
  );
};

export default MeetingForm;
