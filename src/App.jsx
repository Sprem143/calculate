import { useEffect, useState } from 'react'
import Table from 'react-bootstrap/Table';
import axios from 'axios';
import './App.css'
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';
import Accordion from 'react-bootstrap/Accordion';
function App() {

  const [file, setFile] = useState(null);
  const [noOfProduct, setNoOfProduct] = useState('');
  const [dPrice,setdPrice]= useState([{}]);
  const [iPrice,setiPrice]= useState([{}]);
  const [nPrice,setnPrice]= useState([{}]);
  const [products, setProducts]= useState([{}]);

  useEffect(() => {
    getfinalsheet();
  },[])

  const calculate = async () => {
    try {
      let result = await fetch('https://calculate-dkpd.onrender.com/calculate', {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' }
      })
      result=await result.json();
      console.log(result);
      setProducts(result.products)
      setiPrice(result.iPrice);
      setdPrice(result.dPrice);
      setnPrice(result.nPrice);
      setNoOfProduct(result.number)
    } catch (err) {
      console.log(err)
    }
  }
  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const getfinalsheet = async () => {
    try {
      let result = await fetch('https://calculate-dkpd.onrender.com/getsheet', {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' }
      });
      result = await result.json();
      setProducts(result.products)
      setiPrice(result.iPrice);
      setdPrice(result.dPrice);
      setnPrice(result.nPrice);
      setNoOfProduct(result.number);
      console.log(result)
    } catch (err) {
      console.log(err)
    }
  }
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('file', file);

    try {
      console.log("function called")
      const response = await axios.post('https://calculate-dkpd.onrender.com/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      if (response.data.number > 0) {
        calculate();
      }
      alert(`Total Number of Product Uploaded:  ${response.data.number}`);
      setNoOfProduct(response.data.number);
      getfinalsheet();
    } catch (error) {
      console.error('Error uploading file:', error);
      alert('Failed to upload file');
    }
  };

  // ----------download excel sheet--------------
  const downloadExcel = async () => {
    try {
      const response = await axios({
        url: 'https://calculate-dkpd.onrender.com/download-excel', // Replace with your backend URL
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
  
      <Accordion className='mt-4'>
      <Accordion.Item eventKey="0">
        <Accordion.Header>Number of Product uploaded : {noOfProduct}</Accordion.Header>
        <Accordion.Body>
        <Table striped bordered hover>
            <thead>
              <tr>
                {/* <th>UPC</th> */}
                <th>S.No</th>
                <th>SKU</th>
                <th>Original Cost</th>
                <th>Current Cost</th>
                <th>Fulfillment</th>
                <th>Amazon Fees% </th>
                <th>Template</th>
                <th>Min Profit</th>
                <th>Inventory</th>
                <th>T Cost</th>
                <th>Max Price</th>
                <th>Min Price</th>
                <th>Amz. Fee</th>
                <th>N profit</th>
                <th>Min</th>
                <th>Max</th>
                <th>s price</th>
                <th>S.P-MIN.P</th>
                <th>Mx.P-S.P</th>
                <th>Diff.</th>
              </tr>
            </thead>
            {products.length > 0 && products.map((p, i) => (
              <tbody>
                <tr key={i}>
                  <td style={{ padding: '0 !important' }}>
                    {i + 1}
                  </td>
                  <td style={{ padding: '0 !important' }}>
                    {p.SKU}
                  </td>
                  <td> {p['Original Product Cost']}</td>
                  <td> {p['Current Products Cost']}</td>
                  <td> {p.Fulfillment}</td>
                  <td> {p['Amazon Fees%']}</td>
                  <td> {p['Shipping Template used']}</td>
                  <td> {p['Min Profit $- Calculations']}</td>
                  <td> {p['Current Inventory']}</td>
                  <td> {p['Total Cost']}</td>
                  <td> {p['Maximum Price']}</td>
                  <td> {p['Minimum Price']}</td>
                  <td> {p['Amazon Fee']}</td>
                  <td> {p['Net Profit']}</td>
                  <td> {p['Min']}</td>
                  <td> {p.Max}</td>
                  <td> {p['Selling Price']}</td>
                  <td> {p['Selling - Min Price for Checking']}</td>
                  <td> {p['Max Price - Selling Price']}</td>
                  <td> {p['Price difference with new-old']}</td>
                  </tr>
              </tbody>
            ))}
          </Table>
        </Accordion.Body>
      </Accordion.Item>
      <Accordion.Item eventKey="1">
        <Accordion.Header>Price Increased: {iPrice.length}</Accordion.Header>
        <Accordion.Body>
        <Table striped bordered hover>
            <thead>
              <tr>
                {/* <th>UPC</th> */}
                <th>S.No</th>
                <th>SKU</th>
                <th>Original Cost</th>
                <th>Current Cost</th>
                <th>Fulfillment</th>
                <th>Amazon Fees% </th>
                <th>Template</th>
                <th>Min Profit</th>
                <th>Inventory</th>
                <th>T Cost</th>
                <th>Max Price</th>
                <th>Min Price</th>
                <th>Amz. Fee</th>
                <th>N profit</th>
                <th>Min</th>
                <th>Max</th>
                <th>s price</th>
                <th>S.P-MIN.P</th>
                <th>Mx.P-S.P</th>
                <th>Diff.</th>
              </tr>
            </thead>
            {iPrice.length > 0 && iPrice.map((p, i) => (
              <tbody>
                <tr key={i}>
                  <td style={{ padding: '0 !important' }}>
                    {i + 1}
                  </td>
                  <td style={{ padding: '0 !important' }}>
                    {p.SKU}
                  </td>
                  <td> {p['Original Product Cost']}</td>
                  <td> {p['Current Products Cost']}</td>
                  <td> {p.Fulfillment}</td>
                  <td> {p['Amazon Fees%']}</td>
                  <td> {p['Shipping Template used']}</td>
                  <td> {p['Min Profit $- Calculations']}</td>
                  <td> {p['Current Inventory']}</td>
                  <td> {p['Total Cost']}</td>
                  <td> {p['Maximum Price']}</td>
                  <td> {p['Minimum Price']}</td>
                  <td> {p['Amazon Fee']}</td>
                  <td> {p['Net Profit']}</td>
                  <td> {p['Min']}</td>
                  <td> {p.Max}</td>
                  <td> {p['Selling Price']}</td>
                  <td> {p['Selling - Min Price for Checking']}</td>
                  <td> {p['Max Price - Selling Price']}</td>
                  <td> {p['Price difference with new-old']}</td>
                  </tr>
              </tbody>
            ))}
          </Table>
        </Accordion.Body>
      </Accordion.Item>

      <Accordion.Item eventKey="2">
        <Accordion.Header>Price Decreased: {dPrice.length}</Accordion.Header>
        <Accordion.Body>
        <Table striped bordered hover>
            <thead>
              <tr>
                {/* <th>UPC</th> */}
                <th>S.No</th>
                <th>SKU</th>
                <th>Original Cost</th>
                <th>Current Cost</th>
                <th>Fulfillment</th>
                <th>Amazon Fees% </th>
                <th>Template</th>
                <th>Min Profit</th>
                <th>Inventory</th>
                <th>T Cost</th>
                <th>Max Price</th>
                <th>Min Price</th>
                <th>Amz. Fee</th>
                <th>N profit</th>
                <th>Min</th>
                <th>Max</th>
                <th>s price</th>
                <th>S.P-MIN.P</th>
                <th>Mx.P-S.P</th>
                <th>Diff.</th>
              </tr>
            </thead>
            {dPrice.length > 0 && dPrice.map((p, i) => (
              <tbody>
                <tr key={i}>
                  <td style={{ padding: '0 !important' }}>
                    {i + 1}
                  </td>
                  <td style={{ padding: '0 !important' }}>
                    {p.SKU}
                  </td>
                  <td> {p['Original Product Cost']}</td>
                  <td> {p['Current Products Cost']}</td>
                  <td> {p.Fulfillment}</td>
                  <td> {p['Amazon Fees%']}</td>
                  <td> {p['Shipping Template used']}</td>
                  <td> {p['Min Profit $- Calculations']}</td>
                  <td> {p['Current Inventory']}</td>
                  <td> {p['Total Cost']}</td>
                  <td> {p['Maximum Price']}</td>
                  <td> {p['Minimum Price']}</td>
                  <td> {p['Amazon Fee']}</td>
                  <td> {p['Net Profit']}</td>
                  <td> {p['Min']}</td>
                  <td> {p.Max}</td>
                  <td> {p['Selling Price']}</td>
                  <td> {p['Selling - Min Price for Checking']}</td>
                  <td> {p['Max Price - Selling Price']}</td>
                  <td> {p['Price difference with new-old']}</td>
                  </tr>
              </tbody>
            ))}
          </Table>
        </Accordion.Body>
      </Accordion.Item>

      <Accordion.Item eventKey="3">
        <Accordion.Header>Price didn't changes: {nPrice.length}</Accordion.Header>
        <Accordion.Body>
        <Table striped bordered hover>
            <thead>
              <tr>
                {/* <th>UPC</th> */}
                <th>S.No</th>
                <th>SKU</th>
                <th>Original Cost</th>
                <th>Current Cost</th>
                <th>Fulfillment</th>
                <th>Amazon Fees% </th>
                <th>Template</th>
                <th>Min Profit</th>
                <th>Inventory</th>
                <th>T Cost</th>
                <th>Max Price</th>
                <th>Min Price</th>
                <th>Amz. Fee</th>
                <th>N profit</th>
                <th>Min</th>
                <th>Max</th>
                <th>s price</th>
                <th>S.P-MIN.P</th>
                <th>Mx.P-S.P</th>
                <th>Diff.</th>
              </tr>
            </thead>
            {nPrice.length > 0 && nPrice.map((p, i) => (
              <tbody>
                <tr key={i}>
                  <td style={{ padding: '0 !important' }}>
                    {i + 1}
                  </td>
                  <td style={{ padding: '0 !important' }}>
                    {p.SKU}
                  </td>
                  <td> {p['Original Product Cost']}</td>
                  <td> {p['Current Products Cost']}</td>
                  <td> {p.Fulfillment}</td>
                  <td> {p['Amazon Fees%']}</td>
                  <td> {p['Shipping Template used']}</td>
                  <td> {p['Min Profit $- Calculations']}</td>
                  <td> {p['Current Inventory']}</td>
                  <td> {p['Total Cost']}</td>
                  <td> {p['Maximum Price']}</td>
                  <td> {p['Minimum Price']}</td>
                  <td> {p['Amazon Fee']}</td>
                  <td> {p['Net Profit']}</td>
                  <td> {p['Min']}</td>
                  <td> {p.Max}</td>
                  <td> {p['Selling Price']}</td>
                  <td> {p['Selling - Min Price for Checking']}</td>
                  <td> {p['Max Price - Selling Price']}</td>
                  <td> {p['Price difference with new-old']}</td>
                  </tr>
              </tbody>
            ))}
          </Table>
        </Accordion.Body>
      </Accordion.Item>
    </Accordion>

    </>
  )
}

export default App
