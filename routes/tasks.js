const express = require('express');
const router = express.Router();
const ObjectId = require('mongodb').ObjectId;

const { CategoryModel , TaskModel, getTaskWithCategory } = require('../models/task.js');

//create categories
router.post("/category", (req,res,next) => {
    console.log('task>>category');
    
    const category = new CategoryModel({
        name:req.body.name
    });

    category.save();

    res.status(200).json({
        message:"category created successfully",
        data:category
    });

});

//create task
router.post("/add", (req,res,next) => {
    console.log('task>>add');
    
    const task = new TaskModel({
        categoryObjectId: new ObjectId(req.body.category_id),
        title:req.body.title,
        content:req.body.content,
        name:req.body.name
    });

    task.save();

    res.status(200).json({
        message:"Task created successfully",
        data:task
    });

});

//get tasks
router.get("/list", (req,res,next) => {
    console.log('task>>list');
    
    getTaskWithCategory().then((document)=>{
        console.log(document);
        
        res.status(200).json({
            message:"Task list extracted successfully",
            tasks:document
        });
    });

});

module.exports = router;