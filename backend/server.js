require('dotenv').config()

const express = require('express')
const mongoose = require('mongoose')
const workoutRoutes = require('./routes/workouts')
const userRoutes = require('./routes/user')
const trackRoutes = require('./routes/tracking')
const employeeRoutes = require('./routes/employee')
const entityRoute = require('./routes/entity')
const newTrackingRoute = require('./routes/newTracking')
const requisition = require('./routes/trackingRequisition')

// express app
const app = express()

// middleware
app.use(express.json())

app.use((req, res, next) => {
  console.log(req.path, req.method)
  next()
})

// routes
app.use('/api/workouts', workoutRoutes)
app.use('/api/user', userRoutes)
app.use('/api/tracking', trackRoutes)
 app.use('/api/employee', employeeRoutes)
app.use('/api/entity' , entityRoute)
app.use('/api/newtracking' ,newTrackingRoute )
app.use('/api/requisition' , requisition)

// connect to db
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    // listen for requests
    app.listen(process.env.PORT, () => {
      console.log('connected to db & listening on port', process.env.PORT)
    })
  })
  .catch((error) => {
    console.log(error)
  })