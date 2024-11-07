import { useState } from 'react'
import axios from 'axios';
import './App.css'
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  
  const [file, setFile] = useState(null);


  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('file', file);

    try {
      console.log("function called")
      const response = await axios.post('http://localhost:5000/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      alert(response.data.msg);
    } catch (error) {
      console.error('Error uploading file:', error);
      alert('Failed to upload file');
    }
  };

  // ----------download excel sheet--------------
  const downloadExcel = async () => {
    try {
      const response = await axios({
        url: 'http://localhost:5000/download-excel', // Replace with your backend URL
        method: 'GET',
        responseType: 'blob', // Important to get the response as a blob (binary data)
      });

      // Create a link element to trigger download
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'data.xlsx'); // File name
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (error) {
      console.error('Error downloading the file:', error);
    }
  };


  return (
  <>
   <div>
        <h2>Upload Excel File</h2>
        <form onSubmit={handleSubmit}>
          <input type="file" onChange={handleFileChange} accept=".xlsx, .xls" />
          <button type="submit">Upload</button>
        </form>
      </div>
      <Button variant="secondary" className='mt-4' onClick={downloadExcel}>
        Download Excel file
      </Button>
  </>
  )
}

export default App
