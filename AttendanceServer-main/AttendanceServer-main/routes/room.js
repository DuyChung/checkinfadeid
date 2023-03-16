var express = require('express');
var router = express.Router();

var controller = require('../controller/romControllers')
var room = require('../models/room')
var userController = require('../controller/userControllers')

/* lấy danh sách phòng ban */
router.post('/getRoomList', async(req, res)=> {
  let id = req.body.company_id
  const data = await controller.getRoomsList(id)
  res.send({
      code:200,
      data:data,
      message:"success"
  })
});


/* lấy chi tiết phòng ban */
router.post('/getRoomDetail', async(req, res)=> {
  let id = req.body.company_id
  let department_id = req.body.department_id
  const data = await controller.getRoomDetail(id,department_id)
  res.send({
      code:200,
      data:data,
      message:"success"
  })
});

/* thêm phòng ban */
router.post('/addRoom', async(req, res)=> {
    let params = room ({
        name:req.body.name,
        shifts:req.body.shifts,
        employees:req.body.employees,
        company_id:req.body.company_id,
        department_id:req.body.department_id
    }) 
  const data = await controller.addRoom(params)
  let body={
    department_id:data.department_id
}
data.employees.forEach(async item => {
    await userController.updateInfo(item,body)
});
  res.send({
      code:200,
      data:data,
      message:"success"
  })
 
});

/* xoá phòng ban */
router.post('/deleteRoom', async(req, res)=> {
    let params= {
        id:req.body.company_id,
        department_id:req.body.department_id
    }
  const room = await controller.findRoomById(params.id,params.department_id)
  const employees = room[0].employees
  const body ={
    department_id:null
  }
  employees.forEach(item=>{
    userController.updateInfo(item,body)
  })
  const data = await controller.deleteRoom(params)

  res.send({
      code:200,
      data:data,
      message:"success"
  })
});

/* sửa phong ban */
router.post('/editRoom', async(req, res)=> {
    let params= {
        id:req.body.company_id,
        department_id:req.body.department_id
    }
  
    let body = req.body

  const data = await controller.editRoom(params,body)
  res.send({
      code:200,
      data:data,
      message:"success"
  })
});


/* xoá 1 nhân viên phong ban */
router.post('/deleteOneEmployee', async(req, res)=> {
  let params= {
      id:req.body.company_id,
      department_id:req.body.department_id,
      user_id:req.body.user_id
  }
const data = await controller.findRoomById(params.id,params.department_id)
let employees = data[0].employees
let employeefilter = employees.filter(item=>item!==params.user_id)
let body={
  employees:employeefilter,
}
await controller.editRoom(params,body)
let userbody={
  department_id:null
}
await userController.updateInfo(params.user_id,userbody)
res.send({
    code:200,
    data:[],
    message:"success"
})
});

/* thêm 1 nhân viên phong ban */
router.post('/insertOneEmployee', async(req, res)=> {
  let params= {
      id:req.body.company_id,
      department_id:req.body.department_id,
      user_id:req.body.user_id
  }
const data = await controller.findRoomById(params.id,params.department_id)
let employees = data[0].employees
let employeefilter = employees.concat(params.user_id)
let body={
  employees:employeefilter,
}
await controller.editRoom(params,body)
let userbody = {
  department_id:params.department_id
}
await userController.updateInfo(params.user_id,userbody)
res.send({
    code:200,
    data:[],
    message:"success"
})
});

/* thêm 1 ca làm vào phong ban */
router.post('/insertShifts', async(req, res)=> {
  let params= {
    id:req.body.company_id,
    department_id:req.body.department_id,
    shifts:req.body.shifts
}
const data = await controller.findRoomById(params.id,params.department_id)
let shiftsList = data[0].shifts
let body={
  shifts: shiftsList.concat(params.shifts)
}
await controller.editRoom(params,body)
res.send({
  code:200
})
});

/* xoá 1 ca làm trong phong ban */
router.post('/deleteShifts', async(req, res)=> {
  let params= {
    id:req.body.company_id,
    department_id:req.body.department_id,
    shifts:req.body.shifts
}
const data = await controller.findRoomById(params.id,params.department_id)
let shiftsList = data[0].shifts
let body={
  shifts: shiftsList.filter(item=>item.shifts_code!==params.shifts.shifts_code)
}
await controller.editRoom(params,body)
res.send({
  code:200
})
});


module.exports = router;
