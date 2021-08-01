const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const connectDB = require('./config/db.js')
const passport = require('passport')
const bodyparser = require('body-parser')
const routes = require('./routes/index')

connectDB()
const app = express()
if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'))
}
app.use(cors())
app.use(bodyparser.urlencoded({ extended: false }))
app.use(bodyparser.json())
app.use(routes)
app.use(passport.initialize())
require('./config/passport')(passport)
const PORT = process.env.PORT || 4000

app.listen(PORT, console.log(`Server running on port ${PORT}`))