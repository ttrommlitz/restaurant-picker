import express from 'express'
import cors from 'cors'
import { getOpenRestaurants } from './getOpenRestaurants.js'

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors({
  origin: process.env.CLIENT_URL || 'http://localhost:3000'
}))

app.post('/api', (req, res) => {
  const { currentDay, timeString } = req.body

  const openRestaurants = getOpenRestaurants(currentDay, timeString)

  res.send(openRestaurants)
})

const { PORT = 3001 } = process.env

app.listen(PORT, () => console.log(`Server running on port ${PORT}!`))