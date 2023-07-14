import 'dotenv/config'
import express from 'express'
import { getOpenRestaurants } from './getOpenRestaurants.js'

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.post('/', (req, res) => {
  const time = req.body

  const openRestaurants = getOpenRestaurants(time)

  res.sendStatus(200)
  res.send(openRestaurants)
})

const { PORT } = process.env

app.listen(PORT, () => console.log(`Server running on port ${PORT}!`))