const mongoose = require('mongoose');

//this is schema blue print
const userSchema = mongoose.Schema({
    email:{type:String,require:true},
    username:{type:String,require:true, unique:true},
    password:{type:String,require:true}
});

module.exports = mongoose.model('User',userSchema);