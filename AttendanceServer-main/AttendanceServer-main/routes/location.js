var express = require('express');
var router = express.Router();

var controller = require('../controller/locationControllers')
var locationModel = require('../models/location')

/* lấy vị trí */
router.post('/getLocationList', async(req, res)=> {
  let id = req.body.company_id
  const data = await controller.getLocationsList(id)
  res.send({
      code:200,
      data:data,
      message:"success"
  })
});

/* thêm vị trí */
router.post('/addLocation', async(req, res)=> {
    let params = locationModel({
        name:req.body.name,
        location:req.body.location,
        company_id:req.body.company_id
    })
  let data = await controller.addLocation(params)
  res.send({
      code:200,
      data:data,
      message:"success"
  })
});

/* xoá vị trí */
router.post('/deleteLocation', async(req, res)=> {
    let params=req.body.company_id
    let data = await controller.deleteLocation(params)
  res.send({
      code:200,
      data:data,
      message:"success"
  })
});

/* sửa vị trí */
router.post('/editLocation', async(req, res)=> {
      let id=req.body.company_id
      let body = req.body
       await controller.editLocation(id,body)
      const location = await controller.getLocationsList(id)
  res.send({
      code:200,
      data:location,
      message:"success"
  })
});
module.exports = router;
