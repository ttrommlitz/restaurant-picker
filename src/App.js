import './App.css';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterLuxon } from '@mui/x-date-pickers/AdapterLuxon'
import { DateTimePicker } from '@mui/x-date-pickers';
import OpenRestaurants from './OpenRestaurants.js'

import { useState } from 'react';
import { DateTime } from 'luxon';

function App() {
  const [value, setValue] = useState(DateTime.now())
  return (
    <LocalizationProvider dateAdapter={AdapterLuxon}>
      <div className="App">
        <DateTimePicker 
          label="Basic date time picker" 
          value={value}
          onAccept={newValue => setValue(newValue)}/>
        <OpenRestaurants time={value} />
      </div>
    </LocalizationProvider>
  );
}

export default App;