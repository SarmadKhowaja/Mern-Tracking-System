
const express = require('express')
const {
    getconfiguration
} = require('../controllers/configurationController')

const router = express.Router()

// GET all workouts
router.get('/', getconfiguration)



module.exports = router;