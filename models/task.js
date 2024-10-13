const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
    name:String
});

const taskSchema = mongoose.Schema({
    categoryObjectId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Category',
        required:true
    },
    title:{type:String, require:true},
    content:{type:String, require:true}
});

const CategoryModel = mongoose.model('Category',categorySchema);
const TaskModel = mongoose.model('Task',taskSchema);

function getTaskWithCategory(){
    try {
        const task = TaskModel.find().populate('categoryObjectId');
        return task;
    } catch (error) {
        console.log("error",error);
        throw error;
        
    }
}

module.exports = {
    CategoryModel,
    TaskModel,
    getTaskWithCategory
}