var user = require("../models/user");

module.exports = {
 
  addUser:(item)=>{
    return new  user(item).save();
},

//thay đổi thoog tin
updateInfo :(user_id,body)=>{
    return user.updateOne({user_id:user_id},body)
},

//xoá user
deleteUser :(id)=>{
  return user.deleteOne({user_id:id})
},

//lấy danh sách nhân viên theo phòng ban
getUserByDetpartment :(department_id, company_id)=>{
  return user
  .find({ company_id: company_id,department_id:department_id })
  .select(" name user_id phone day_of_birth avatar ");
},

//lấy thôn tin nhân viên theo id
getUserById :(user_id)=>{
  return user
  .find({user_id:user_id})
  .select("name user_id company_id root phone day_of_birth password avatar department_id ");
}
};
