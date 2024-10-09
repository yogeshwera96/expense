const express = require('express')
const cors = require('cors')
const { db } = require('./db/db')
const { readdirSync} = require('fs')
require('dotenv').config();

const userRoutes = require('./routes/user')



const app = express()
require('dotenv').config()

const PORT = process.env.PORT

//middlewares

app.use(express.json())
app.use(cors({
    origin: 'http://localhost:3000' , // Allow requests from your frontend
    credentials: true,
}))

//routes
readdirSync('./routes').map((route) => app.use('/api/v1', require('./routes/' + route)))
app.use('/api/user', userRoutes)

const server = () => {
    db()
app.listen(PORT, () => {
    console.log('listening to port:', PORT)
})
}

server()