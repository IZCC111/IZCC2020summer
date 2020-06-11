const mongoose = require('mongoose');

const applySchema = new mongoose.Schema({
    name: {
        type:String,
        required:true
    },
    gender:{
        type: String,
        required: true
    },
    size:{
        type:String,
        required:true
    },
    school:String,
    phone:{
        type:String,
        required:true
    },
    parent:{
        type:String,
        required:true
    },
    traffic:{
        type:String,
        required:true
    },
    eat:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    identity:{
        type:String,
        required:true
    },
    emergency:{
        type:String,
        required:true
    },
    birthday:{
        type:Date,
        required:true
    },
    parentalConsent:{
        type:Buffer,
        required:true
    },
    note:{
        type:String,
        max:1024
    },
    success:{
        type:Boolean,
        default:false
    }

})

module.exports=mongoose.model('apply',applySchema);