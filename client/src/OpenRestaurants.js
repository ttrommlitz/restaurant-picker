import './css/OpenRestaurants.css'
import RestaurantComponent from './RestaurantComponent'
import axios from 'axios'
import { useEffect, useState } from 'react'

const OpenRestaurants =  ({ time }) => {
  const [openRestaurants, setOpenRestaurants] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (!time?.isValid) return 
        const { data } = await axios.post('/api', {
          currentDay: time.weekday,
          timeString: time.toFormat('hh:mm a').toLowerCase()
        }, { baseURL: process.env.REACT_APP_EXPRESS_SERVER_URL || 'http://localhost:3001'})

        setOpenRestaurants(data)
      } catch (err) {
        console.log(err)
      }
    }

    fetchData()
  }, [time])

  if (time?.isValid) {
    return (
      <div className='all-restaurants-container'>
        {
          openRestaurants.length 
            ? openRestaurants.map(r => {
              return <RestaurantComponent key={r.name} restaurant={r} weekday={time.weekday} />
            }) 
            : <p>There are no open restaurants at this time</p>
        }
      </div>
    )
  }
}
export default OpenRestaurants