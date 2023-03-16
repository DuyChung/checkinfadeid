var mongoose = require('mongoose')
var Schema = mongoose.Schema;

var face = new Schema({
    name:String,
    face_data:Object,
    user_id:String
})
 var faceModels = mongoose.model("face",face)
 module.exports = faceModels