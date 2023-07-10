// const mongoose = require('mongoose');

// const citySchema = new mongoose.Schema({
//   cityCode: {
//     type: String,
//     required: true,
//     unique: true,
//   },
//   title: {
//     type: String,
//     required: true,
//   },
// });

// module.exports = mongoose.model('city', citySchema);



const mongoose = require('mongoose');

const citySchema = mongoose.Schema({
    // _id: mongoose.Schema.Types.ObjectId,
    // name: { type: String, required: true },
});

module.exports = mongoose.model('city', citySchema);