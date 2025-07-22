import { useState, useEffect } from 'react'
import marvelLogo from './assets/marvel_logo.svg'
import './App.css'
import Card from './components/Card';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const URL = 'https://www.whenisthenextmcufilm.com/api';
const OPTIONS = {
  method: 'GET', 
  headers: {
    accept: 'application/json'
  }
};

function App() {
  
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState({})
  const [date, setDate] = useState(new Date())
  
  const fetchData = async () => {
    setErrorMessage('');
    setIsLoading(true);

    try {
      var dateISO = (date.toISOString()).substring(0,10)
      const response = await fetch(URL+"?date="+dateISO, OPTIONS);

      if(!response.ok) {
        throw new Error('Failed to fetch movies');
      }

      const data = await response.json();
      setData(data || {});
    } catch (e) {
      console.e(`Error fetching the next MCU production: ${e}`);
      setErrorMessage('Error fetching. Please try again later.');
    }
    
  }

  useEffect(() => {
    fetchData();
    setIsLoading(false);
  }, [data, date]);

  return (
    <>
      <header>
        <img className='logo' src={marvelLogo} alt='Marvel Studios Logo'/>
        <h2>On this day</h2>
        <DatePicker className='datepicker'
          selected={date}
          onChange={(date) => setDate(date)}
        />
        <br/>
      </header>
      <div>
        { isLoading ? <p>Loading...</p> : <Card data={data}></Card>}
        { errorMessage? <p>{errorMessage}</p> : <p></p>}
      </div>
    </>
  )
}

export default App
