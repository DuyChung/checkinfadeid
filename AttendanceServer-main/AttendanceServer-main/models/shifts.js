var mongoose = require('mongoose')
var Schema = mongoose.Schema;

var shifts = new Schema({
    name:String,
    working_day:Number,
    time_start:Object,
    time_end:Object,
    date_in_week:Array,
    company_id:String,
    shifts_code:String
})
 var shifsModels = mongoose.model("Shifts",shifts)
 module.exports = shifsModels