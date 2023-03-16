var mongoose = require('mongoose')
var Schema = mongoose.Schema;

var user = new Schema({
    name:String,
    user_id:String,
    company_id:String,
    root:Boolean,
    phone:String,
    day_of_birth:String,
    password:String,
    avatar:Object,
    department_id:String,
    money:Number,
    status:String
})
 var userModels = mongoose.model("user",user)
 module.exports = userModels