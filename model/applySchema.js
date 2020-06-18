const mongoose = require('mongoose');

/**
 *
 * @type {module:mongoose.Schema<any>} 報名資料的schema
 * @param name 姓名
 * @param gender 性別
 * @param size 訓服尺寸
 * @param school 國中(非必須)
 * @param phone 電話號碼
 * @param parent 父母
 * @param traffic 交通方式
 * @param eat 葷/素
 * @param email 電子郵件
 * @param identity 身分證
 * @param emergency 緊急聯絡人
 * @param birthday 生日
 * @param note 註記(非必須)
 * @param success 是否錄取
 */
const applySchema = new mongoose.Schema({
    name: {
        type:String,
        required:true,
        max: 30
    },
    gender:{
        type: String,
        required: true,
        max: 4
    },
    size:{
        type:String,
        required:true,
        max: 10
    },
    school:{
        type:String,
        max:30
    },
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