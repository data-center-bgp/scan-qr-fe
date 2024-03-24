import { Html5QrcodeScanner } from "html5-qrcode";
import { useState, useEffect } from "react";
import './App.css';

function App() {

  const [scanResult, setScanResult] = useState(null);

  const submitData = () => {
    const data = {
      scannedData: scanResult,
    };
    fetch('https://scan-qr-be.vercel.app/create', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
    .then((response) => response.json())
    .then(data => console.log(data))
    .catch((error) => {
      console.error('Error:', error);
    });
  };

  useEffect(() => {
    const scanner = new Html5QrcodeScanner('reader', {
      qrbox: {
        width: 400,
        height: 400,
      },
      fps: 5,
    });
    scanner.render(success, error);
  
    function success(result) {
      scanner.clear();
      setScanResult(result);
    }
  
    function error(err) {
      console.warn(err);
    }

    return () => {
      scanner.clear();
    }
  },[]);

  return (
    <div className="App">
      <h1>QR CODE SCANNING IN REACT</h1>
      {scanResult ? (
        <div>
          Success: {scanResult}
          <button onClick={submitData}>Submit</button>
        </div>
      ) : (
        <div id="reader"></div>
      )}
    </div>
  );
}

export default App;