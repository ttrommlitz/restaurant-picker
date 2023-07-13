import express from 'express'
import 'dotenv/config'

const app = express()

app.get('/', (req, res) => {
  res.send('Hello there!')
})

const { PORT } = process.env

app.listen(PORT, () => console.log(`Server running on port ${PORT}!`))