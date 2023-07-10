const mongoose = require('mongoose')


const evtitySchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    entityName: { type: String, required: true },
    city: { type: mongoose.Schema.Types.ObjectId, ref: 'city', required: true },
    country: { type: mongoose.Schema.Types.ObjectId, ref: 'country', required: true }

    
});

module.exports = mongoose.model('entity', evtitySchema);
