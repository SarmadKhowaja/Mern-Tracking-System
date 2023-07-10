const mongoose = require('mongoose');

const configurationSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    OS: { type: String, required: true },
    CPU: { type: String, required: true },
    RAM: { type: String, required: true },
    HDD: { type: String, required: true },
});

module.exports = mongoose.model('configuration', configurationSchema);