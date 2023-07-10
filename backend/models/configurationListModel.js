const mongoose = require('mongoose');

const configurationListSchema = mongoose.Schema({
    fields : []
});

module.exports = mongoose.model('configurationList', configurationListSchema);