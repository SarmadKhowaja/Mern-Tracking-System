const mongoose = require('mongoose');

const countrySchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: { type: String, required: true },
});

const Country = mongoose.model('country', countrySchema);

module.exports = Country;