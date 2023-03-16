var express = require('express');
var router = express.Router();

var controller = require('../controller/shiftsControllers')
var Shifts = require('../models/shifts')
var roomController = require('../controller/romControllers')

/* lấy danh sách ca làm */
router.post('/getShiftsList', async(req, res)=> {
    let id = req.body.company_id
  const data = await controller.getShiftsList(id)
  res.send({
      code:200,
      data:data,
      message:"success"
  })
});

/* TÌM danh sách ca làm theo id */
router.post('/getShiftsById', async(req, res)=> {
    let shifts_code = req.body.shifts_code
  const data = await controller.getShiftsById(shifts_code)
  res.send({
      code:200,
      data:data,
      message:"success"
  })
});


/* TÌM danh sách ca làm theo ngày */
router.post('/getShiftsByDay', async(req, res)=> {
  let department_id = req.body.department_id
  let day = req.body.day
  let company_id = req.body.company_id

  const room = await roomController.findRoomById(company_id,department_id)
  if(room.length>0){
    const arr_shifts = room[0].shifts
    let arr_shifts_in_day=[]
    for(let i=0;i<arr_shifts.length;i++){
      const check = arr_shifts[i].date_in_week.some(item=>item == day)
      if(check==true){
        arr_shifts_in_day = arr_shifts_in_day.concat(arr_shifts[i])
      }
    }
      res.send({
      code:200,
      data:arr_shifts_in_day,
      message:"success"
  })
  }
  else{
    res.send({
      code:400,
      message:"Không thể lấy danh sách ca làm"
    })
  }

});

/* thêm ca làm */
router.post('/addShifts', async(req, res)=> {
    let params = Shifts({
        name:req.body.name,
        working_day:req.body.working_day,
        time_start:req.body.time_start,
        time_end:req.body.time_end,
        date_in_week:req.body.date_in_week,
        company_id:req.body.company_id,
        shifts_code:req.body.shifts_code
    })   
  const data = await controller.addShifts(params)
  res.send({
      code:200,
      data:data,
      message:"success"
  })
});

/* xoá ca làm */
router.post('/deleteShifts', async(req, res)=> {
    let params= {
        id:req.body.company_id,
        shifts_code:req.body.shifts_code
    }
    const roomlist = await roomController.getRoomsList(params.id)
    for(let i=0;i<roomlist.length;i++){
       let newShifts = roomlist[i].shifts.filter(item=>item.shifts_code!==params.shifts_code)
       let params_1 ={
        department_id:roomlist[i].department_id,
        id:params.id
       }
       let body={
        shifts:newShifts
       }
     const edit =  await roomController.editRoom(params_1,body)
    }
  const data = await controller.deleteShifts(params)
  res.send({
      code:200,
      data:data,
      message:"success"
  })
});

/* sửa ca làm */
router.post('/editShifts', async(req, res)=> {
    let params= {
        id:req.body.company_id,
        shifts_code:req.body.shifts_code
    }
    let body = req.body
  const data = await controller.editShifts(params,body)
  res.send({
      code:200,
      data:data,
      message:"success"
  })
});
module.exports = router;
