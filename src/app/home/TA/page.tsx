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
        alert('Traning session Added successfully');
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

  const [meetingDetails, setMeetingDetails] = useState<MeetingDetails>({
    id: 0,
    name: '',
    dateTime: '',
    actionPoints: ['ali','ali1'],
  });
  
  useEffect(() => {
    const fetchMeetingDetails = async () => {
      try {
        const response = await fetch('http://localhost:3001/api/1meetings/Meeting');
        if (!response.ok) {
          throw new Error('Failed to fetch meeting details');
        }
  
        const data = await response.json();
        console.log(data);
        

        const firstMeeting = data[0];
        const actionPoints = firstMeeting.action_points ? JSON.parse(firstMeeting.action_points) : [];
        console.log(actionPoints);
        const combinedDateTime = data[0].date.substring(0, 10) + 'T' + data[0].time;
        const formattedDateTime = new Date(combinedDateTime).toLocaleString();
  
        const formattedMeetingDetails: MeetingDetails = {
          id: data[0].id,
          name: data[0].name,
          dateTime: formattedDateTime,
          actionPoints: actionPoints
        };
        setMeetingDetails(formattedMeetingDetails);
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
      <h1>Training & Awareness</h1>
      {department === "Quality Control" && (
    <div className="container">
      
      <div>
        <label>Training Name:</label>
        <input type="text" value={meetingTitle} onChange={(e) => setMeetingTitle(e.target.value)} />
      </div>
      <div>
        <label>Training Starting day:</label>
        <input type="datetime-local" value={meetingDateTime} onChange={(e) => setMeetingDateTime(e.target.value)} />
      </div>
      <div>
        <label>Training Sessions:</label>
        <input type="text" value={actionPointInput} onChange={(e) => setActionPointInput(e.target.value)} />
        <button onClick={addActionPoint}>Add session</button>
        <ul>
          {actionPoints.map((point, index) => (
            <li key={index}>{point}</li>
          ))}
        </ul>
      </div>
      <button onClick={scheduleMeeting}>Add Training</button>
      </div>)}
      <div className="container" style={{ paddingTop: '20px' }}>
      <div>
  <h2>Training Details</h2>
  <p>Name: {meetingDetails.name}</p>
  <p>Training Starting day: {meetingDetails.dateTime}</p>
  <h3>Training Sessions:</h3>
    <ul>
      {meetingDetails.actionPoints.map((point, index) => (
        <li key={index}>Day {index + 1}: {point}</li> 
      ))}
    </ul>
</div>

    </div>
    </div>
   
  );
};

export default MeetingPage;
