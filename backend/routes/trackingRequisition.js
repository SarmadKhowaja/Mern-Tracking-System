const express = require('express');
const router = express.Router();

const {
    AddNew,
    ModifyTracking,
    getAllTracking,
    getTrackingGridData,
    UpdateTracking,
    getTrackingModification


  } = require('../controllers/trackingRequisitionController')
  


// Route for creating a new tracking document
router.post('/', AddNew);
router.post('/:id/trackingModification', ModifyTracking);
router.post('/:id/update', UpdateTracking);
router.get('/getmodification' , getTrackingModification);

router.get('/' , getAllTracking);
router.get('/getData/' , getTrackingGridData);



module.exports = router;