const express = require('express');
const router = express.Router();

const {
    addEmployee,
    getAllEmployees
  } = require('../controllers/employeeController')
  

  router.post('/', addEmployee);

// Route for creating a new tracking document
router.get('/', getAllEmployees);

module.exports = router;