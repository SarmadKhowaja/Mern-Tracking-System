
const Tracking = require('../models/trackingModel');
const mongoose = require('mongoose')

exports.addTrackingSystem = async (req, res) => {
  try {
    const tracking = new Tracking({
      id: req.body.id,
      clientName: req.body.clientName,
      serverName: req.body.serverName,
      ipAddress: req.body.ipAddress,
      serverType: req.body.serverType,
      usage: req.body.usage,
      hostedAt: req.body.hostedAt,
      esxiServer: req.body.esxiServer,
      requestedBy: req.body.requestedBy,
      type: req.body.type,
      completionDate: req.body.completionDate,
      configCR: req.body.configCR,
      email: req.body.email,
      subject: req.body.subject,
      reason: req.body.reason,
      trackingModification: req.body.trackingModification
    });

    const savedTracking = await tracking.save();

    res.status(201).json(savedTracking);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};




exports.getTrackingModification = async (req , res) => {
  try {
    const docs = await Tracking.find({}, {
      'trackingModification._id': 1,
      'trackingModification.configurationBeforeUpgrade': 1,
      'trackingModification.configurationAfterUpgrade': 1,
      'trackingModification.emailSubject': 1,
      'trackingModification.reason': 1,
      serverName: 1,
    })
      .lean()
      .exec();

    const result = docs.reduce((acc, doc) => {
      const trackingModifications = doc.trackingModification.map((tm) => ({
        _id: tm._id,
        configurationBeforeUpgrade: tm.configurationBeforeUpgrade,
        configurationAfterUpgrade: tm.configurationAfterUpgrade,
        emailSubject: tm.emailSubject,
        reason: tm.reason,
        serverName : doc.serverName,
        serverId : doc._id
      }));

      acc.push({
     
        trackingModifications,
      });

      return acc;
    }, []);

    res.status(200).json(result);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
  }

}

exports.addModificationRecord = async (req, res) => {
    const { id } = req.params;
  
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({ error: 'No such tracking' });
    }
  
    const tracking = await Tracking.findOne({ _id: id });
  
    if (!tracking) {
      return res.status(404).json({ error: 'No such tracking' });
    }
  
    //const { configurationbeforeUpgrade, upgradeRequirment, configurationAfterUpgrade, emailSubject , reason} = req.body.trackingModification;

// Create a new modification object
const newModification = {
  configurationBeforeUpgrade: req.body.trackingModification.configurationBeforeUpgrade,
  upgradeRequirement: req.body.trackingModification.upgradeRequirement,
  configurationAfterUpgrade: req.body.trackingModification.configurationAfterUpgrade,
  emailSubject: req.body.trackingModification.emailSubject,
  reason: req.body.trackingModification.reason
};
    // Add the new modification object to the tracking document
    tracking.trackingModification.push(newModification);
  
    // Save the updated tracking document
    const updatedTracking = await tracking.save();
  
    res.status(200).json(updatedTracking);
  };
  


// // PATCH /api/tracking/:id/modification
// exports.addModificationRecord = async (req, res) => {
//     const { id } = req.params;
  
//     if (!mongoose.Types.ObjectId.isValid(id)) {
//       return res.status(404).json({ error: 'No such tracking' });
//     }
  
//     const tracking = await Tracking.findOne({ _id: id });
  
//     if (!tracking) {
//       return res.status(404).json({ error: 'No such tracking' });
//     }
  
//     const { modification } = req.body;
  
//     // Find the modification object in the tracking document with the matching ID
//     const modIndex = tracking.modification.findIndex((mod) => mod._id.toString() === modification._id.toString());
  
//     if (modIndex === -1) {
//       return res.status(404).json({ error: 'No such modification' });
//     }
  
//     // Update the modification object in the tracking document
//     tracking.modification[modIndex] = {
//       ...tracking.modification[modIndex],
//       ...modification,
//     };
  
//     // Save the updated tracking document
//     const updatedTracking = await tracking.save();
  
//     res.status(200).json(updatedTracking);
//   };
  
// exports.addModificationRecord = async (req, res) => {
//   const { trackingId } = req.params;

//   try {
//     const tracking = await Tracking.findById(trackingId);

//     if (!tracking) {
//       return res.status(404).json({ message: 'Tracking not found' });
//     }

//     const trackingModification = {
//       configurationBeforeUpgrade: req.body.configurationBeforeUpgrade,
//       upgradeRequirement: req.body.upgradeRequirement,
//       configurationAfterUpgrade: req.body.configurationAfterUpgrade,
//       emailSubjectCR: req.body.emailSubjectCR
//     };

//     tracking.trackingModification.push(trackingModification);

//     const updatedTracking = await tracking.save();

//     res.json(updatedTracking);
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// };


exports.getTracking = async (req , res) => {
 
  const trackingList = await Tracking.find({}).sort({createdAt: -1})

  res.status(200).json(trackingList)

}




exports.updateTrackingSystem = async (req, res) => {
  const { trackingId } = req.params;

  try {
    const tracking = await Tracking.findByIdAndUpdate(trackingId, req.body, {
      new: true,
      runValidators: true
    });

    if (!tracking) {
      return res.status(404).json({ message: 'Tracking not found' });
    }

    res.json(tracking);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
