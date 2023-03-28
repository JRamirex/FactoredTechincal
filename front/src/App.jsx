import './App.css';
import React, { useEffect, useState } from 'react';

const App = () => {
  const [message, setMessage] = useState('');

  const getWelcomMessage = async () => {
    const requestOptions = {
      mode: 'cors',
      method: 'GET',
      headers: { 
        'Content-type':'application/json',
      },
    };
    const response = await fetch('http://localhost:8000/back', requestOptions);
    const data = await response.json();

    console.log(data);
  };

  useEffect(() => {
    getWelcomMessage();
  }, [])

  return (
    <div>
      <h1>Test</h1>
    </div>
  );
}

export default App;
