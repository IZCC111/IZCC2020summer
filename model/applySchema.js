const mongoose = require('mongoose');

const applySchema = new mongoose.Schema({
    name: {
        type:String,
        required:true,
        max: 30
    },
    gender:{
        type: String,
        required: true,
        max: 30
    },
    size:{
        type:String,
        required:true,
        max: 30
    },
    school:String,
    phone:{
        type:String,
        required:true,
        max: 30
    },
    parent:{
        type:String,
        required:true,
        max: 30
    },
    traffic:{
        type:String,
        required:true,
        max: 30
    },
    eat:{
        type:String,
        required:true,
        max: 30
    },
    email:{
        type:String,
        required:true,
        max: 30
    },
    identity:{
        type:String,
        required:true,
        max: 30
    },
    emergency:{
        type:String,
        required:true,
        max: 30
    },
    birthday:{
        type:Date,
        required:true,
    },
    note:{
        type:String,
        max:150
    },
    success:{
        type:Boolean,
        default:false
    }
});

module.exports=mongoose.model('apply',applySchema);