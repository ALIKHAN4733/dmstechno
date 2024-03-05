"use client"
import React, { useState } from 'react';
import { Document, Page } from 'react-pdf';

const PdfViewer: React.FC = () => {
 const [numPages, setNumPages] = useState<number | null>(null);
 const [pageNumber, setPageNumber] = useState(1);


 const handlePrevPage = () => {
    if (pageNumber > 1) {
      setPageNumber(pageNumber - 1);
    }
 };

 const handleNextPage = () => {
    if (pageNumber < numPages!) {
      setPageNumber(pageNumber + 1);
    }
 };

 return (
    <div>
      <Document
        file="uploads\pdf-1703959440106.pdf"
      >
        <Page pageNumber={pageNumber} />
      </Document>
      <div>
        <button onClick={handlePrevPage}>Previous</button>
        <button onClick={handleNextPage}>Next</button>
      </div>
    </div>
 );
};

export default PdfViewer;
