const { DateTime } = require('luxon');

function parseRestaurantHours(hoursArray) {
  const result = {};
  const dayMapping = {
    sun: 7,
    mon: 1,
    tue: 2,
    wed: 3,
    thu: 4,
    fri: 5,
    sat: 6
  };

  hoursArray.forEach(hours => {
    const firstNumberIndex = hours.search(/\d/);
    const daysString = hours.substring(0, firstNumberIndex).trim()
    const timeRange = hours.substring(firstNumberIndex).trim()
    const dayRanges = daysString.includes(',') ? daysString.split(',').map(day => day.trim()) : [daysString];
    const times = timeRange.match(/\d{1,2}(:\d{2})?\s?[ap]m/g);

    dayRanges.forEach(dayRange => {
      const [startDay, endDay] = dayRange.includes('-') 
        ? dayRange.split('-').map(day => day.trim())
        : [dayRange, dayRange]
      const startValue = dayMapping[startDay.toLowerCase()];
      const endValue = dayMapping[endDay.toLowerCase()];

      for (let i = startValue; i <= endValue; i++) {
        const currentDay = DateTime.local().set({ weekday: i });
        const formattedDay = currentDay.weekdayShort.toLowerCase();
        const [startTime, endTime] = times

        result[formattedDay] = {
          start: startTime,
          end: endTime
        };
      }
    });
  });

  return result;
}

const json = require('./src/rest_hours.json')

json.forEach(({ times }) => {
  console.log(parseRestaurantHours(times))
})

function convertTimeString(timeStr) {
  // Check if the time string already matches the hh:mm format
  if (/^\d{2}:\d{2} [ap]m$/i.test(timeStr)) {
    return timeStr;
  }

  // Extract the hours, minutes, and am/pm indicator
  let [time, amPm] = timeStr.split(' ');
  let [hours, minutes] = time.split(':');

  // Format the hours and minutes as strings with leading zeros
  let formattedHours = hours.toString().padStart(2, '0');
  let formattedMinutes = minutes ? minutes.padStart(2, '0') : '00';

  // Return the formatted time string
  return formattedHours + ':' + formattedMinutes + ' ' + amPm.toLowerCase();
}

// Example usage
const inputTime = '9:30 am';
const convertedTime = convertTimeString(inputTime);
console.log(convertedTime);

console.log(DateTime.now().plus({ hours: 8 }).toFormat('hh:mm a'))