const mongoose = require('mongoose')
const NewTracking = require('../models/newTrackingModel');

exports.AddNewTracking = async (req , res)=> {

    try 
    {
   // before add new tracking add configuration
     const Addconfiguration = {
        _id: mongoose.Types.ObjectId(),
        OS : req.body.configuration.os,
        CPU : req.body.configuration.cpu,
        RAM :  req.body.configuration.ram,
        HDD : req.body.configuration.hdd
     };

     const tracking = new NewTracking({
        _id: mongoose.Types.ObjectId(),
        client: req.body.client,
        serverName: req.body.serverName,
        ipAddress: req.body.ipAddress,
        serverType: req.body.serverType,
        usage: req.body.usage,
        hostedAt: req.body.hostedAt,
        esxiServer: req.body.esxiServer,
        requestedBy: req.body.requestedBy,
        type: req.body.type,
        completionDate: req.body.completionDate,
        configuration: Addconfiguration,
        email: req.body.email,
        subject: req.body.subject,
        reason: req.body.reason,
        trackingModification: req.body.trackingModification
      });
  
     
     const savedTracking = await tracking.save(tracking);

    
        res.status(201).json(savedTracking);
      } catch (err) {
        res.status(500).json({ error: err.message });
      }
};

exports.getTrackingModification = async (req, res) => {
  try {
    const docs = await NewTracking.find({}, {
      'trackingModification._id': 1,
      'trackingModification.configurationBeforeUpgrade': 1,
      'trackingModification.configurationAfterUpgrade': 1,
      'trackingModification.emailSubject': 1,
      'trackingModification.upgradeRequirement': 1,
      'trackingModification.reason': 1,
      serverName: 1,
      _id: 1,
    })
      .lean()
      .exec();

    const result = docs.reduce((acc, doc) => {
      doc.trackingModification.forEach((tm) => {
        const trackingModification = {
          _id: tm._id,
          configurationBeforeUpgrade: tm.configurationBeforeUpgrade,
          configurationAfterUpgrade: tm.configurationAfterUpgrade,
          upgradeRequirement : tm.upgradeRequirement,
          emailSubject: tm.emailSubject,
          reason: tm.reason,
          serverName: doc.serverName,
          //serverId: doc._id,
        };
        acc.push(trackingModification);
      });
      return acc;
    }, []);

    const listOfTracking = await NewTracking.find({}, 'serverName _id').lean();

    const returnResult = {
      serverList: listOfTracking,
      modificationList: result,
    };

    res.status(200).json(returnResult);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
  }
};


// exports.getTrackingModification = async (req, res) => {
//   try {
//     const docs = await NewTracking.find({}, {
//       'trackingModification._id': 1,
//       'trackingModification.configurationBeforeUpgrade': 1,
//       'trackingModification.configurationAfterUpgrade': 1,
//       'trackingModification.emailSubject': 1,
//       'trackingModification.reason': 1,
//       serverName: 1,
//     })
//       .lean()
//       .exec();

//     const result = docs.reduce((acc, doc) => {
//       const trackingModifications = doc.trackingModification.map((tm) => ({
//         _id: tm._id,
//         configurationBeforeUpgrade: tm.configurationBeforeUpgrade,
//         configurationAfterUpgrade: tm.configurationAfterUpgrade,
//         emailSubject: tm.emailSubject,
//         reason: tm.reason,
//         serverName: doc.serverName,
//         serverId: doc._id
//       }));

//       acc.push({
       
//       trackingModifications
//       });

//       return acc;
//     }, []);

//     const listOfServers = await NewTracking.find({}, '_id serverName');
//     const serverList = listOfServers.map((server) => ({
//       _id: server._id,
//       serverName: server.serverName
//     }));

//     const retunResule = {
//       serverList,
//       modificationList: result
//     };

//     res.status(200).json(retunResule);
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ error: 'Internal server error' });
//   }
// };


exports.addModificationRecord = async (req, res) => {
    const { id } = req.params;
  
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({ error: 'No such tracking' });
    }
  
    const tracking = await NewTracking.findOne({ _id: id });
  
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

  exports.getAllTracking = async (req, res) => {
    NewTracking.find()
      .select("serverName client ipAddress serverType usage hostedAt configuration trackingModification _id")
      //.populate('entity', 'entityName')
      //.populate('serverType' , 'name')
      .exec()
      .then(docs => {
        res.status(200).json({
          count: docs.length,
          Tracking: docs.map(doc => {
            return {
              _id: doc._id,            
              serverType: doc.serverType,
              serverName: doc.serverName,
              configuration : doc.configuration,
              trackingModification : doc.trackingModification,
              usage : doc.usage,
              hostedAt : doc.hostedAt,
              ipAddress : doc.ipAddress              
            };
          })
        });
      })
      .catch(err => {
        res.status(500).json({
          error: err
        });
      });
  };
  


