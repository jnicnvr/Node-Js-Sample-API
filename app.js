require('dotenv').config()
const express = require('express')
const app = express()
const cors = require('cors')
const PORT = process.env.PORT || 5000

//routes
const api_routes = require('./routes/api')
const auth_routes = require('./routes/auth')
const post = require('./routes/post')


app.use(express.json())
app.use(cors({
    credential:true,
    origin:['http://localhost:3000']
}))
app.use('/api', post)
app.use('/api', api_routes)
app.use('/api/auth',auth_routes)

app.listen(PORT, () => console.log(`Server is starting at Port: ${PORT}...`))