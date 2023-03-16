var mongoose = require('mongoose')
var Schema = mongoose.Schema;

var chamcong = new Schema({
    date:String,
    shifts:Object,
    user_id:String,
    status:Array,
    attendance:Array,
    chamcong_id:String
})
 var chamcongModels = mongoose.model("chamcong",chamcong)
 module.exports = chamcongModels