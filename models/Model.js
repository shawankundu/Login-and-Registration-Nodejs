const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const usrSchema = new Schema({
    usrName:{
        type:String,
        required:true
    },
    usrPhone:{
        type:String,
        required:true
    },
    usrMail:{
        type:String,
        required:true
    },
    usrPass:{
        type:String,
        required:true
    },
    isVerified:{
        type:Boolean,
        default:true
    }
})
const usrModel = new mongoose.model('UserSignupDb',usrSchema);
module.exports = usrModel;