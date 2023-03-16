var attendane = require("../models/attendance");

module.exports = {
  //lấy danh sách điểm danh
  getattendanceList: (id) => {
    return attendane
      .find({ user_id: id })
      .select("name face_data time type location date status shifts");
  },
  //điểm danh
  attendance: (params) => {
    return new attendane(params).save();
  },
};
