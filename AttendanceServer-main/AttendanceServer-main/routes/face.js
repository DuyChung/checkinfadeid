var express = require('express');
var router = express.Router();

var controller = require('../controller/faceControllers')
var face = require('../models/face')

/* lấy danh sách khuôn mặt */
router.post('/getFaceList', async(req, res)=> {
  let id = req.body.user_id
  const data = await controller.getFacesList(id)
  res.send({
      code:200,
      data:data,
      message:"success"
  })
});

/* thêm khuôn mặt */
router.post('/addFace', async(req, res)=> {
    let params = face({
        name:req.body.name,
        face_data:req.body.face_data,
        user_id:req.body.user_id
    })   
  const data = await controller.addFace(params)
  res.send({
      code:200,
      data:data,
      message:"Thêm khuôn mặt thành công"
  })
});

/* xoá khuôn mặt */
router.post('/deleteFace', async(req, res)=> {
       let id = req.body.user_id
       let data = await controller.deleteFace(id)
  res.send({
      code:200,
      data:data,
      message:"Đã xoá khuôn mặt"
  })
});

module.exports = router;
