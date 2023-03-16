var mongoose = require('mongoose')
var Schema = mongoose.Schema;

var attendance = new Schema({
    name:String,
    face_data:String,
    user_id:Number,
    time:String,
    type:Number,
    location:Object,
    date:String,
    status:String,
    shifts:Object
})
 var attendanceModels = mongoose.model("attendance",attendance)
 module.exports = attendanceModels