var chamcong = require("../models/chamcong");

module.exports = {
  addChamcong:(item)=>{
    return new  chamcong(item).save();
},

updateChamcong :(params,body)=>{
    return chamcong.updateOne({user_id: params.user_id,chamcong_id:params.chamcong_id},body)
},

getChamconglist:(id)=>{
  return chamcong.find({ user_id: id }).select("date shifts status attendance chamcong_id user_id ");
},

getChamcongById:(user_id,chamcong_id)=>{
  return chamcong.find({ user_id: user_id,chamcong_id:chamcong_id }).select(" date shifts user_id status attendance chamcong_id");
},

getChamcongByDay:(user_id,date)=>{
  return chamcong.find({ user_id: user_id,date:date }).select(" date shifts user_id status attendance chamcong_id");
}
};
