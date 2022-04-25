const mongoose = require('mongoose');

const todoSchema = new mongoose.Schema({
    _id :{
        type : Number,
        required : true
    },
    title :{
        type : String,
        required : true
    },
    text :{
        type : String,
        required : true
    }
    ,date :{
        type : Date,
        required : true
    }
})

module.exports = mongoose.model('todo', todoSchema)