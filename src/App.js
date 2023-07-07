import './App.css';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterLuxon } from '@mui/x-date-pickers/AdapterLuxon'
import { DateTimePicker } from '@mui/x-date-pickers';
import OpenRestaurants from './OpenRestaurants.js'

import { useState } from 'react';

function App() {
  const [value, setValue] = useState()
  return (
    <LocalizationProvider dateAdapter={AdapterLuxon}>
      <div className="App">
        <h1>Discover Open Restaurants</h1>
        <DateTimePicker
          label='choose a day and time'
          onChange={newValue => setValue(newValue)}/>
        <OpenRestaurants time={value} />
      </div>
    </LocalizationProvider>
  );
}

export default App;