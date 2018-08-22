const mongoose = require('mongoose');
const Category = require('../models/category');

exports.create_category= (req, res, next) => {
    const category = new Category({
        _id: new mongoose.Types.ObjectId(),
        name: req.body.name,
        description: req.body.description,
    });
    
    category.save().then( result => {
        console.log(result);
        res.status(201).json({
            message: 'category created'
    });
    }).catch( err => {
		console.log(err);
		res.status(500).json({ error: err})
	})
};

exports.get_category = (req, res, next) => {
    Category.find().select('_id name description').exec().then( result => {
        if (result) {
            res.status(200).json(
                result
            );
            
        }else{
            return res.status(404).json({
                message: 'Category not found'
            })
        }
        
    })
};
