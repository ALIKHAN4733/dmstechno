"use client"
import PdfViewer from './com/pdf';
import backgroundImg from './1706611569415.png';  // Make sure to provide the correct path

export default function Home() {
  const urlParams = new URLSearchParams(window.location.search);
  const filepathdb = urlParams.get('filepathdb') || ''; // Provide a default value

  return (
    <div style={{
      paddingTop: '140px',
      backgroundImage: `url(${backgroundImg})`,
      backgroundSize: 'cover',  // Adjust as needed
      backgroundPosition: 'center',  // Adjust as needed
      minHeight: '100vh',  // Adjust as needed
    }}>
      <PdfViewer filePath={filepathdb} />
    </div>
  );
}
