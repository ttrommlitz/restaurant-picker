import { readFile } from 'fs/promises'
const jsonData = JSON.parse(
  await readFile(
    new URL('./rest_hours.json', import.meta.url)
  )
)

const convertTimeString = timeStr => {
  // Check if the time string already matches the hh:mm format
  if (/^\d{2}:\d{2} [ap]m$/i.test(timeStr)) {
    return timeStr
  }

  const [time, amPm] = timeStr.split(' ')
  const [hours, minutes] = time.split(':')

  // Format the hours and minutes as strings with leading zeros
  let formattedHours = hours.toString().padStart(2, '0')
  let formattedMinutes = minutes ? minutes.padStart(2, '0') : '00'

  return formattedHours + ':' + formattedMinutes + ' ' + amPm.toLowerCase()
}

const parseRestaurantHours = hoursArray => {
  const result = {}
  const dayMapping = {
    sun: 7,
    mon: 1,
    tue: 2,
    wed: 3,
    thu: 4,
    fri: 5,
    sat: 6
  }

  hoursArray.forEach(hours => {
    const firstNumberIndex = hours.search(/\d/)
    const daysString = hours.substring(0, firstNumberIndex).trim()
    const timeRange = hours.substring(firstNumberIndex).trim()
    const dayRanges = daysString.includes(',') ? daysString.split(',').map(day => day.trim()) : [daysString]
    const times = timeRange.match(/\d{1,2}(:\d{2})?\s?[ap]m/g)

    dayRanges.forEach(dayRange => {
      const [startDay, endDay] = dayRange.includes('-') 
        ? dayRange.split('-').map(day => day.trim())
        : [dayRange, dayRange]
      const startValue = dayMapping[startDay.toLowerCase()]
      const endValue = dayMapping[endDay.toLowerCase()]

      for (let i = startValue; i <= endValue; i++) {
        const [startTime, endTime] = times

        result[i] = {
          start: convertTimeString(startTime),
          end: convertTimeString(endTime)
        }
      }
    })
  })

  return result
}

const allRestaurants = jsonData.map(({ name, times }) => {
  return {
    name,
    hours: parseRestaurantHours(times)
  }
})

const isGreaterThan = (chosenTime, startTime) => {
  if (!startTime) return false
  if (chosenTime.slice(-2) === 'pm' && startTime.slice(-2) === 'am') return true
  if (chosenTime.slice(-2) === 'am' && startTime.slice(-2) === 'pm') return false

  let [chosenHours, chosenMinutes] = chosenTime.slice(0, -3).split(':').map(n => parseInt(n))
  let [startHours, startMinutes] = startTime.slice(0, -3).split(':').map(n => parseInt(n))

  // handle edge case for time comparisons
  if (chosenHours === 12) chosenHours = 0
  if (startHours === 12) startHours = 0

  if (chosenHours > startHours) return true
  if (chosenHours === startHours) {
    return chosenMinutes >= startMinutes
  }
  return false
}

const isLessThan = (chosenTime, endTime) => {
  if (!endTime) return false
  if (chosenTime.slice(-2) === 'pm' && endTime.slice(-2) === 'am') return false
  if (chosenTime.slice(-2) === 'am' && endTime.slice(-2) === 'pm') return true

  let [chosenHours, chosenMinutes] = chosenTime.slice(0, -3).split(':').map(n => parseInt(n))
  let [endHours, endMinutes] = endTime.slice(0, -3).split(':').map(n => parseInt(n))

  // handle edge case for time comparisons
  if (chosenHours === 12) chosenHours = 0
  if (endHours === 12) endHours = 0
  
  if (chosenHours > endHours) return false
  if (chosenHours === endHours) {
    return chosenMinutes < endMinutes
  }
  return true
}

const isCurrentlyOpen = (currentDay, timeString, restaurantHours) => {
  // check if day before ends past midnight
  const dayBefore = currentDay - 1 || 7
  const prevEnd = restaurantHours[dayBefore]?.end
  if (isLessThan(timeString, prevEnd) && prevEnd.slice(-2) === 'am') {
    return true
  }

  const currEnd = restaurantHours[currentDay]?.end

  // if closing is midnight or later, set it to just before midnight. Past midnight closing is already handled by checking the day before
  const finalEnd = currEnd && currEnd.slice(-2) === 'am' ? '11:59 pm' : currEnd

  return isGreaterThan(timeString, restaurantHours[currentDay]?.start) 
    && (isLessThan(timeString, finalEnd))
}

export const getOpenRestaurants = (currentDay, timeString) => {
  console.log(timeString)
  return allRestaurants.filter(r => {
    return isCurrentlyOpen(currentDay, timeString, r.hours)
  })
}
