var express = require('express');
var router = express.Router();

var chamcongcontroller = require('../controller/chamcongControllers')

/* lấy danh sách điểm danh của user */
router.post('/getChamcongList', async(req, res)=> {
  let id = req.body.user_id
  let monthyear = req.body.monthyear
  const data = await chamcongcontroller.getChamconglist(id)
  let datafilter = data.filter(item=>item.date.slice(3,10) == monthyear == true)
  res.send({
      code:200,
      data:datafilter,
      message:"success"
  })
});

//lấy danh sách chấm công theo ngày
router.post('/getChamcongByDay', async(req, res)=> {
  let user_id = req.body.user_id
  let day = req.body.day
  const data = await chamcongcontroller.getChamcongByDay(user_id,day)
  res.send({
      code:200,
      data:data,
      message:"success"
  })
});
module.exports = router;
