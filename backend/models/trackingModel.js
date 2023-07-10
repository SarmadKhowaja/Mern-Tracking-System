const mongoose = require('mongoose');
const Schema = mongoose.Schema;

 const trackingModificationSchema = new mongoose.Schema({
     configurationBeforeUpgrade: {
       type: String,
       required: true,
     },
     upgradeRequirement: {
       type: String,
       required: true,
     },
     configurationAfterUpgrade: {
       type: String,
       required: true,
    },
     emailSubject: {
       type: String,
       required: true,
     },
     reason:{
         type:String,
        required : false
     }
   });


const trackingSchema = new Schema({
  id: {
    type: Number,
    required: true
  },
  clientName: {
    type: String,
    required: true
  },
  serverName: {
    type: String,
    required: true
  },
  ipAddress: {
    type: String,
    required: true
  },
  serverType: {
    type: String,
    required: true
  },
  usage: {
    type: String,
    required: true
  },
  hostedAt: {
    type: String,
    required: true
  },
  esxiServer: {
    type: String,
    required: true
  },
  requestedBy: {
    type: String,
    required: true
  },
  type: {
    type: String,
    required: true
  },
  completionDate: {
    type: Date,
    required: true
  },
  configCR: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  subject: {
    type: String,
    required: true
  },
  reason: {
    type: String,
    required: true
  },
   trackingModification: [trackingModificationSchema],

},{ timestamps: true });

module.exports  = mongoose.model('tracking', trackingSchema);


