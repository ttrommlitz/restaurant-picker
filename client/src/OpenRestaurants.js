import RestaurantComponent from './RestaurantComponent'
import axios from 'axios'

const OpenRestaurants = ({ time }) => {
  if (!time?.isValid) return 
   const openRestaurants = axios.post('/', {
    time
  })
    .then(res => console.log(res))
    .catch(error => console.log(error))

  return (
    <div>
      {openRestaurants.map(r => {
        return <RestaurantComponent key={r.name} restaurant={r} weekday={time.weekday} />
      })}
    </div>
  )
  
}
export default OpenRestaurants