var mongoose = require('mongoose')
var Schema = mongoose.Schema;

var room = new Schema({
    name:String,
    shifts:Array,
    employees:Array,
    company_id:String,
    department_id:String
})
 var roomModels = mongoose.model("room",room)
 module.exports = roomModels