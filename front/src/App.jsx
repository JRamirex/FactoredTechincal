import React, { useContext, useEffect, useState } from 'react';
import Login from './Components/Login';
import Header from './Components/Header';
import { UserContext } from './context/UserContext';
import {
  Chart as ChartJS,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
} from 'chart.js';
import { Radar } from 'react-chartjs-2';

const styles = {
  backgroundColor: "#96E6BE" // set the desired background color here
};

ChartJS.register(
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend
);


const App = () => {
  const [errorMessage, setErrorMessage] = useState('');
  const [token,] = useContext(UserContext)
  const [user, setUser] = useState('')

  const data = {
    labels: ['Python', 'Spark', 'SQL', 'Java', 'VBA', 'C#'],
    datasets: [
      {
        label: 'Coding scores',
        data: [user.pythonScore, user.sparkScore, user.sqlScore, user.javaScore, user.vbaScore, user.cScore],
        backgroundColor: 'rgba(255, 255, 255, 0.2)',
        borderColor: 'rgba(100, 200, 200, 1)',
        borderWidth: 2,
      },
    ],
  };

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
    <div style={styles}>
      <Header title='Welcome!' />
      <div className="colum-m-5-is-two-thirds">
        {!token ? (
          <div className='rows'>
            <Login userFunction = {setUser}/>
          </div>
        
        ):(
          <>
            <div class="columns">
              <div class="column">
                <h2 class="title is-3">Hi! here it's your information{user.nombreUsuario}</h2>
                  <h2 class="title is-4">Complete Name</h2>
                  <p class="subtitle is-5 is-spaced">{user.name}</p>

                  <h2 class="title is-4">Email</h2>
                  <p class="subtitle is-5 is-spaced">{user.email}</p>

                  <h2 class="title is-4">Company Position</h2>
                  <p class="subtitle is-5 is-spaced">{user.position}</p>
              </div>
              <div class="column">
                <h2 class="title is-3 centered">Skills</h2>
                <div>
                  <Radar data = {data}></Radar>
                </div>
              </div>
            </div>
          </>
        )
        }

      </div>
    </div>
  );
  
}

export default App;
