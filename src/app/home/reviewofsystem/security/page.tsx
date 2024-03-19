"use client"
import React, { useState, ChangeEvent, useEffect } from 'react';
import Link from 'next/link';
import { EmbedPDF } from "@simplepdf/react-embed-pdf";
import './style.css';
import Router from 'next/router';

// Interface for the file object
interface FileObject {
  id: number;
  file_name: string;
  path: string;
}

const Home: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const [fileName, setFileName] = useState<string | null>(null);
  const [customFileName, setCustomFileName] = useState<string>(''); // Added state for custom file name
  const [files, setFiles] = useState<FileObject[]>([]);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const selectedFile = e.target.files[0];
      setFile(selectedFile);
      setFileName(selectedFile.name);
    }
  };
  

  function SendProps(filepathdb: string) {
    Router.push({
      pathname: 'qualitypolicy/pdfview',
      query: {
        filepathdb,
      }
    });
  }
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

  const handleCustomFileNameChange = (e: ChangeEvent<HTMLInputElement>) => {
    setCustomFileName(e.target.value);
  };

  const handleLinkClick = (url: string) => {
    window.open(url, '_blank');
    console.log(url);
  };

  const handleUpload = async () => {
    if (!file) {
      console.error('No file selected');
      return;
    }

    const formData = new FormData();
    formData.append('pdf', file);
    formData.append('customFileName', customFileName);

    try {
      const response = await fetch('http://localhost:3001/upload', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        console.log('File uploaded successfully');
        setCustomFileName('');

        // Reload the page upon successful upload
        window.location.reload();
      } else {
        console.error('Failed to upload file');
      }
    } catch (error) {
      console.error('Error uploading file:', error);
    }
  };

  useEffect(() => {
    const fetchFiles = async () => {
      try {
        const response = await fetch('http://localhost:3001/getFiles');
        if (response.ok) {
          const data = await response.json();
          setFiles(data);
        } else {
          console.error('Failed to fetch files');
        }
      } catch (error) {
        console.error('Error fetching files:', error);
      }
    };

    fetchFiles();
  }, []);
  
  return (
    <div className='body'>
   

    
      <div className='toph'>
      Security
      </div>
      <div className='main'>
      {department === "Quality Control" && (
          <div className="container">
            <input type="file" accept=".pdf" onChange={handleFileChange} />
            <input
              type="text"
              placeholder="Enter custom file name"
              value={customFileName}
              onChange={handleCustomFileNameChange}
            />
            <p>Selected File: {fileName || 'No file selected'}</p>
            <button onClick={handleUpload}>Upload</button>
          </div>
        )}

      <h2>Uploaded Files:</h2>
      <ul>

      
{files.map((file) => (
  <li key={file.id}>
    <Link href={{
      pathname:"security/pdfview",
      query:{filepathdb: file.path}
    }}>
      {file.file_name}
    </Link>
  </li>
))}

      </ul>
      
      

    </div>
    </div>
    
  );
};

export default Home;
