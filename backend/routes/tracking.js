const express = require('express');
const router = express.Router();

const {
    addTrackingSystem,
    addModificationRecord,
    getTracking,
    getTrackingModification
  } = require('../controllers/trackingController')
  


// Route for creating a new tracking document
router.post('/', addTrackingSystem);

router.post('/:id/trackingModification', addModificationRecord);

router.get('/trackMod' , getTrackingModification);

router.get('/' , getTracking);

module.exports = router;