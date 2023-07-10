const mongoose = require('mongoose');
const Schema = mongoose.Schema;

 const trackingModificationSchema = new mongoose.Schema({
     configurationBeforeUpgrade: {},
     upgradeRequirement: {
       type: String,
       required: true,
     },
     configurationAfterUpgrade: {},
     emailSubject: {
       type: String,
       required: false,
     },
     reason:{
         type:String,
        required : true,
     }
   },{ timestamps: true });


const trackingRequistionSchema = new Schema({
    _id: mongoose.Schema.Types.ObjectId,

  client: { type: mongoose.Schema.Types.ObjectId, ref: 'client', required: true },

  serverName: {
    type: String,
    required: true
  },
  ipAddress: {
    type: String,
    required: true
  },
  
  serverType: { type: mongoose.Schema.Types.ObjectId, ref: 'serverType', required: true },

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
  type:{
    type: String,
    required: true
  },

  completionDate: {
    type: Date,
    required: true
  },
  configuration: {},

  email: {
    type: String,
    required: true
  },
  subject: {
    type: String,
    required: false
  },
  reason: {
    type: String,
    required: true
  },
   trackingModification: [trackingModificationSchema],

},{ timestamps: true });

module.exports  = mongoose.model('serverTracking', trackingRequistionSchema);


