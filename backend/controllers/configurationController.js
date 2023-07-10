const mongoose = require('mongoose')
const newConfiguration = require('../models/configurationListModel');



exports.getconfiguration = async (req, res) => {

    const workouts = await newConfiguration.find()
  
   res.status(200).json(workouts)
  }

  


