const RestaurantComponent = ({ restaurant, weekday }) => {
  const { start, end } = restaurant.hours[weekday]

  return (
    <div>
      <div>{restaurant.name}</div>
      <div>{`Open from ${start} to ${end} today`}</div>
    </div>
  )
}

export default RestaurantComponent
