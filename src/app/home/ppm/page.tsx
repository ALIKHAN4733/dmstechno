'use client'
import React, { useEffect, useState } from 'react';
import './style.css';

interface MeetingDetails {
  id: number;
  name: string;
  dateTime: string; // Assuming dateTime is a string representing date and time
  actionPoints: string[]; // Corrected property name
}

const MeetingPage: React.FC = () => {
  const [meetingTitle, setMeetingTitle] = useState('');
  const [meetingDateTime, setMeetingDateTime] = useState('');
  const [actionPoints, setActionPoints] = useState<string[]>([]);
  const [actionPointInput, setActionPointInput] = useState('');

  const addActionPoint = () => {
    if (actionPointInput.trim() !== '') {
      setActionPoints(prev => [...prev, actionPointInput.trim()]);
      setActionPointInput('');
    }
  };

  const scheduleMeeting = async () => {
    const meetingData = {
      name: meetingTitle,
      dateTime: meetingDateTime,
      actionPoints: actionPoints,
    };

    try {
      const response = await fetch('http://localhost:3001/api/meetings', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(meetingData),
      });

      if (response.ok) {
        alert('Meeting scheduled successfully');
        // Reset form
        setMeetingTitle('');
        setMeetingDateTime('');
        setActionPoints([]);
      } else {
        alert('Failed to schedule meeting');
      }
    } catch (error) {
      console.error('Error scheduling meeting:', error);
      alert('Error scheduling meeting');
    }
  };

  const [meetingDetails, setMeetingDetails] = useState<MeetingDetails[]>([]);

  useEffect(() => {
    const fetchMeetingDetails = async () => {
      try {
        const response = await fetch('http://localhost:3001/api/1meetings/Meeting');
        if (!response.ok) {
          throw new Error('Failed to fetch meeting details');
        }
  
        const data = await response.json();
        const formattedMeetings = data.map((meeting: any) => {
          const actionPoints = meeting.action_points ? JSON.parse(meeting.action_points) : [];
          const combinedDateTime = meeting.date.substring(0, 10) + 'T' + meeting.time;
          const formattedDateTime = new Date(combinedDateTime).toLocaleString();
  
          return {
            id: meeting.id,
            name: meeting.name,
            dateTime: formattedDateTime,
            actionPoints: actionPoints,
          };
        });
        
        setMeetingDetails(formattedMeetings);
      } catch (error) {
        console.error('Error fetching meeting details:', error);
      }
    };
  
    fetchMeetingDetails();
  }, []);
  
  
  
  
  const [department, setName] = useState('');

  useEffect(() => {
    // Retrieve 'userData' from session storage and parse it back to an object
    const userDataStoredString = sessionStorage.getItem('userData');
    if (userDataStoredString) {
      try {
        const userDataStored = JSON.parse(userDataStoredString);
        if (userDataStored && userDataStored.department) {
          setName(userDataStored.department);
        } else {
          console.error('Error: User data in session storage is invalid');
        }
      } catch (error) {
        console.error('Error parsing user data from session storage:', error);
      }
    } else {
      console.error('Error: User data not found in session storage');
    }
  }, []);

  return (
    <div>
      {department === "Quality Control" && (
    <div className="container">
      <h1>Preproduction Process Meeting & Checklist</h1>
      <div>
        <label>Meeting Title:</label>
        <input type="text" value={meetingTitle} onChange={(e) => setMeetingTitle(e.target.value)} />
      </div>
      <div>
        <label>Meeting Date and Time:</label>
        <input type="datetime-local" value={meetingDateTime} onChange={(e) => setMeetingDateTime(e.target.value)} />
      </div>
      <div>
        <label>Action Points:</label>
        <input type="text" value={actionPointInput} onChange={(e) => setActionPointInput(e.target.value)} />
        <button onClick={addActionPoint}>Add Action Point</button>
        <ul>
          {actionPoints.map((point, index) => (
            <li key={index}>{point}</li>
          ))}
        </ul>
      </div>
      <button onClick={scheduleMeeting}>Schedule Meeting</button>
      </div>)}
      <div className="container" style={{ paddingTop: '20px' }}>
  {meetingDetails.map((meeting, index) => (
    <div key={meeting.id}>
      <h2>Meeting Details</h2>
      <p>Name: {meeting.name}</p>
      <p>Date and Time: {meeting.dateTime}</p>
      <h3>Action Points</h3>
      <ul>
        {meeting.actionPoints.map((point, index) => (
          <li key={index}>{point}</li>
        ))}
      </ul>
    </div>
  ))}
</div>


    </div>
    
   
  );
};

export default MeetingPage;
