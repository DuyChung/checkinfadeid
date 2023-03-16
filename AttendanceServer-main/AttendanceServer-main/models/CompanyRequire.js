var mongoose = require('mongoose')
var Schema = mongoose.Schema;
    
var face = new Schema({
    user:Object
})
 var faceModels = mongoose.model("face",face)
 module.exports = faceModels