
const mongoose = require('mongoose')
const Employee = require('../models/employee');
const City = require('../models/city');

exports.getAllEmployees = async (req, res) => {
  Employee.find()
    .select("employeeCode employeeName city _id")
    .populate('city', 'name')
    .exec()
    .then(docs => {
      res.status(200).json({
        count: docs.length,
        employee: docs.map(doc => {
          return {
            _id: doc._id,
            city: doc.city,
            employeeCode: doc.employeeCode,
            employeeName: doc.employeeName,
            
          };
        })
      });
    })
    .catch(err => {
      res.status(500).json({
        error: err
      });
    });
}

exports.addEmployee = async (req, res) => {
  City.findById(req.body.city)
    .then(city => {
      if (!city) {
        return res.status(404).json({
          message: "city not found"
        });
      }
      const newemp = new Employee({
        _id: mongoose.Types.ObjectId(),
        employeeCode: req.body.employeeCode,
        employeeName: req.body.employeeName,
        city: req.body.city
      });
      return newemp.save();
    })
    .then(result => {
      console.log(result);
      res.status(201).json({
        message: "Employee stored",
        createdEmployee: {
          _id: result._id,
          employeeCode: result.employeeCode,
          employeeName: result.employeeName,
          city: result.city
          
        }
      });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      });
    });
};
