// const mongoose = require('mongoose');

// const employeeSchema = new mongoose.Schema({
//   employeeCode: {
//     type: String,
//     required: true,
//     unique: true,
//   },
//   employeeName: {
//     type: String,
//     required: true,
//   },
//   cityCode: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: 'city',
//     required: true,
//   },
// });

// module.exports = mongoose.model('employee', employeeSchema);


const mongoose = require('mongoose');

const employeeSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    employeeCode: { type: String, required: true },
    employeeName: { type: String, required: true },
    city: { type: mongoose.Schema.Types.ObjectId, ref: 'city', required: true }
    
});

module.exports = mongoose.model('employee', employeeSchema);


