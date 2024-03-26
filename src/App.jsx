import { Html5QrcodeScanner } from "html5-qrcode";
import { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [scanResult, setScanResult] = useState(null);
  const [message, setMessage] = useState(null);
  const [isError, setIsError] = useState(false);

  const submitData = () => {
    const data = {
      scannedData: scanResult,
    };
    fetch("https://scan-qr-be.vercel.app/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => {
        if (!response.ok) {
          throw response;
        }
        return response.json();
      })
      .then((data) => {
        setMessage("Data submitted successfully!");
        setIsError(false);
      })
      .catch((error) => {
        if (error.status === 400) {
          setMessage("Data is already exists!");
          setIsError(true);
        } else {
          setMessage("Error: " + error);
          setIsError(true);
        }
      });
  };

  useEffect(() => {
    const scanner = new Html5QrcodeScanner("reader", {
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
    };
  }, []);

  return (
    <div className="App">
      <h1>SCAN QR BARCODE DISINI</h1>
      {message && (
        <div className={isError ? "error" : "success"}>{message}</div>
      )}
      <div></div>
      {scanResult ? (
        <div className="scanResultContainer">
          <p>
          Success: {scanResult}
          </p>
          <button className="submitButton" onClick={submitData}>Submit</button>
          <button className="scanAgainButton" onClick={() => window.location.reload()}>Scan Again</button>
        </div>
      ) : (
        <div id="reader"></div>
      )}
    </div>
  );
}

export default App;
