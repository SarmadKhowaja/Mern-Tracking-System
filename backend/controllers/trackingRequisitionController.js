const mongoose = require('mongoose')
const TrackingRequistion = require('../models/serverRequisitionModel')
const Client = require('../models/clientModel')
const ServerType = require('../models/serverTypeModel')
const ConfigurationList = require('../models/configurationListModel')

exports.AddNew = async (req , res)=> {

    try 
    {

     const tracking = new TrackingRequistion({
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
        configuration: req.body.configuration,
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


exports.UpdateTracking = async (req, res) => {
  try {
    const tracking = await TrackingRequistion.findByIdAndUpdate(
      req.params.id,
      {
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
        configuration: req.body.configuration,
        email: req.body.email,
        subject: req.body.subject,
        reason: req.body.reason,
        trackingModification: req.body.trackingModification
      },
      { new: true }
    );

    if (!tracking) {
      return res.status(404).send("Tracking requisition not found");
    }

    res.send(tracking);
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
        configurationBeforeUpgrade: objectToString(tm.configurationBeforeUpgrade),
        configurationAfterUpgrade: objectToString(tm.configurationAfterUpgrade),
        emailSubject: tm.emailSubject,
        reason: tm.reason,
        
      }));

      acc.push({
        trackingid: doc._id,
        serverName: doc.serverName,
        trackingModifications
        
      });

      return acc;
    }, []);

    res.status(200).json(result);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
  }

}

exports.ModifyTracking = async (req, res) => {
  try {
    // Get the requisition ID from the request parameters
    const { id } = req.params;

    // Find the requisition document in the database by ID and update its fields
    const updatedRequisition = await TrackingRequistion.findByIdAndUpdate(
      id,
      {
        $push: { trackingModification: req.body.trackingModification },
        $set: { configuration: req.body.trackingModification.configurationAfterUpgrade },
      },
      { new: true } // Return the updated document
    );

    // If the requisition is not found, return an error response
    if (!updatedRequisition) {
      return res.status(404).json({ message: 'Requisition not found' });
    }

    // Return the updated requisition document in the response
    res.json(updatedRequisition);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

exports.updateTrackingModification = async (req, res) => {
  try {
    const { id, trackingModificationId } = req.params;

    // Find the requisition document in the database by ID
    const requisition = await TrackingRequistion.findById(id);

    // If the requisition is not found, return an error response
    if (!requisition) {
      return res.status(404).json({ message: 'Requisition not found' });
    }

    // Find the tracking modification object in the array by ID and update its fields
    const updatedTrackingModification = requisition.trackingModification.id(trackingModificationId);

    // Check if the createdAt property of the updated tracking modification object is greater than all other tracking modification objects
    const isLatestModification = requisition.trackingModification.every((trackingModification) => {
      return updatedTrackingModification.createdAt >= trackingModification.createdAt;
    });

    if (!isLatestModification) {
      return res.status(400).json({ message: 'The updated tracking modification is not the latest modification' });
    }

    updatedTrackingModification.set(req.body);

    // Update the configuration field with the configurationAfterUpgrade object
    requisition.configuration = updatedTrackingModification.configurationAfterUpgrade;

    // Save the updated requisition document in the database
    const savedRequisition = await requisition.save();

    // Return the updated requisition document in the response
    res.json(savedRequisition);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};



  exports.getAllTracking = async (req, res) => {
    TrackingRequistion.find()
      .select("serverName client ipAddress serverType usage hostedAt configuration trackingModification _id")
      .populate('client', 'name')
      .populate('serverType' , 'name')
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
              ipAddress : doc.ipAddress,
              client : doc.client,
              serverType : doc.serverType,
                           
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

  
  exports.getTrackingGridData = async (req, res) => {
    
      const client = await Client.find().lean().exec(); // Query Table1
      const serverTypeList = await ServerType.find().lean().exec(); // Query Table2
      const configList = await ConfigurationList.find().lean().exec(); // Query Table2
    const trackingList = await  TrackingRequistion.find()
      .select("serverName client ipAddress serverType usage hostedAt configuration trackingModification email subject reason requestedBy esxiServer updatedAt  _id")
      .populate('client', 'name')
      .populate('serverType' , 'name')
      .exec()
      .then(docs => {
        res.status(200).json({
          count: docs.length,
          clientList : client,
        serverTypeList : serverTypeList,
        configurationList : configList,
          Tracking: docs.map(doc => {
            const configurationString = objectToString(doc.configuration);
            const date = doc.updatedAt.toLocaleDateString("en-GB", {
              day: "2-digit",
              month: "2-digit",
              year: "numeric",
            });
                        return {
              _id: doc._id,            
              serverType: doc.serverType,
              serverName: doc.serverName,
              configuration : configurationString,
              configObj : doc.configuration,
              trackingModification : doc.trackingModification,
              usage : doc.usage,
              hostedAt : doc.hostedAt,
              ipAddress : doc.ipAddress,
              client : doc.client,
              serverType : doc.serverType,
              reason : doc.reason,
              requestedBy : doc.requestedBy,
              email : doc.email,
              subject : doc.subject ,
              esxiServer : doc.esxiServer,
              updatedAt : date           
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


  function objectToString(obj) {
    const entries = Object.entries(obj);
    const keyValuePairs = entries.map(([key, value]) => `${key}=${value}`);
    const result = keyValuePairs.join(', ');
    return result;
  }