const mongoose = require('mongoose');

const serverTypeSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: { type: String, required: true },
});

module.exports = mongoose.model('serverType', serverTypeSchema);