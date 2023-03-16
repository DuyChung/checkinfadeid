var express = require('express');
var router = express.Router();

var controller = require('../controller/AtendanceControllers')
var attendance = require('../models/attendance')
var chamcongcontroller = require('../controller/chamcongControllers')

/* lấy danh sách điểm danh của user */
router.post('/getAttendanceList', async(req, res)=> {
  let id = req.body.user_id
  let month = req.body.month
  const data = await controller.getattendanceList(id)
  res.send({
      code:200,
      data:data,
      message:"success"
  })
});

/* điểm danh */
router.post('/attendance', async(req, res)=> {

let hour_in = req.body.shifts.time_start.slice(0,2)
let minute_in = req.body.shifts.time_start.slice(3,5)
let hour_out =req.body.shifts.time_end.slice(0,2)
let minute_out =req.body.shifts.time_end.slice(3,5)
let status_in='';
let status_out='';

if(req.body.type==0){
  if( (hour_in == req.body.time.slice(0,2)) == true){
    if(minute_in < req.body.time.slice(3,5) == true){
      status_in= 'Vào trể'
    }
  }
  else if(hour_in < req.body.time.slice(0,2) == true ){
    status_in= 'Vào trể'
  }
  var chamcong_data = {
    date:req.body.date,
    shifts:req.body.shifts,
    user_id:req.body.user_id,
    status:[status_in,'Chưa ra ca'],
    chamcong_id:req.body.chamcong_id,
    attendance:[
      {type:0,time:req.body.time}
    ]
  }
  await chamcongcontroller.addChamcong(chamcong_data)

  let params = attendance({
    user_id:req.body.user_id,
    time:req.body.time,
    type:req.body.type,
    location:req.body.location,
    date:req.body.date,
    status:status_in,
    shifts:req.body.shifts,
    
})   
 await controller.attendance(params)
}
else if(req.body.type==1){
  if( (hour_out == req.body.time.slice(0,2)) == true){
    if((minute_out >= req.body.time.slice(3,5)) == true){
      status_out= 'Ra sớm'
    }
  }
  if( (hour_out > req.body.time.slice(0,2)) == true){
    status_out = 'Ra sớm'
  }
  let params = attendance({
    user_id:req.body.user_id,
    time:req.body.time,
    type:req.body.type,
    location:req.body.location,
    date:req.body.date,
    status:status_out,
    shifts:req.body.shifts,
    
})   
 await controller.attendance(params)
 
  const chamcong_data = await chamcongcontroller.getChamcongById(req.body.user_id,req.body.chamcong_id)
  let check_out = {
    type:1,
    time:req.body.time
  }
  if(chamcong_data.length>0){
   const atendance_updated = chamcong_data[0].attendance.concat(check_out)
  const status_update =  chamcong_data[0].status.slice(0,1).concat(status_out)
   const body ={
    attendance:atendance_updated,
    status:status_update
   }
   const params = {
    user_id:req.body.user_id,
    chamcong_id:req.body.chamcong_id
   }
   
  await chamcongcontroller.updateChamcong(params,body)
  }
}
res.send({
    code:200,
    data:[],
    message:"Điểm danh thành công"
})
});



module.exports = router;