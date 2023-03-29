import React, { useContext, useEffect, useState } from 'react';
import Login from './Components/Login';
import Header from './Components/Header';
import { UserContext } from './context/UserContext';

const App = () => {
  const [message, setMessage] = useState('');
  const [token,] = useContext(UserContext)

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
  };

  useEffect(() => {
    getWelcomMessage();
  }, [])

  return (
    <>
      <Header title={message} />
      <div className='columns'></div>
      <div className="colum-m-5-is-two-thirds">
        {!token ? (
          <div className='columns'>
            <Login/>
          </div>
        ):(
          <p>Table</p>
        )
        }
      </div>
      <div className='column'></div>
    </>
  );
}

export default App;
