var mongoose = require('mongoose')
var Schema = mongoose.Schema;

var location = new Schema({
    name:String,
    location:Object,
    company_id:String
})
 var locationModels = mongoose.model("location",location)
 module.exports = locationModels