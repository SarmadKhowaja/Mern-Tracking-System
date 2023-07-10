const express = require('express');
const router = express.Router();

const {
   AddNewTracking ,
   addModificationRecord,
   getAllTracking,
   getTrackingModification
  } = require('../controllers/newTrackingController')
  


// Route for creating a new tracking document
router.post('/', AddNewTracking);
router.post('/:id/trackingModification', addModificationRecord);
router.get('/' , getAllTracking);

router.get('/newTrack' , getTrackingModification);


module.exports = router;