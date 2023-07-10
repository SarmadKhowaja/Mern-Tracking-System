const express = require('express');
const router = express.Router();

const {
    getEntity
  } = require('../controllers/entityController')
  


// Route for creating a new tracking document
router.get('/', getEntity);

module.exports = router;