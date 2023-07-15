import RestaurantComponent from './RestaurantComponent'
import axios from 'axios'
import { useEffect, useState } from 'react'

const OpenRestaurants =  ({ time }) => {
  const [openRestaurants, setOpenRestaurants] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (!time?.isValid) return 
        const response = await axios.post('/', {
          currentDay: time.weekday,
          timeString: time.toFormat('hh:mm a').toLowerCase()
        })

        setOpenRestaurants(response.data)
      } catch (err) {
        console.log(err)
      }
    }

    fetchData()
  }, [time])

  if (time?.isValid) {
    return (
      <div>
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