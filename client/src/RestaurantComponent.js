import './css/RestaurantComponent.css'

const RestaurantComponent = ({ restaurant, weekday }) => {
  const { start, end } = restaurant.hours[weekday]

  return (
    <div className='restaurant-container'>
      <p>{restaurant.name}</p>
      <p>{`Open from ${start} to ${end} today`}</p>
    </div>
  )
}

export default RestaurantComponent
