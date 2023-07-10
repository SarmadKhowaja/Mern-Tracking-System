const mongoose = require('mongoose')
const Entity = require('../models/entity')


exports.getEntity = async (req, res) => {

    Entity.find()
    .select("entityName city country _id")
    .populate('city', 'name')
    .populate('country', 'name')
    .exec()
    .then(docs => {
      res.status(200).json({
        count: docs.length,
        Entity: docs.map(doc => {
          return {
            _id: doc._id,
            city: doc.city,
            country: doc.country,
            entityName: doc.entityName,
            
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
