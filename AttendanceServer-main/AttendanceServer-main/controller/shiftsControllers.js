var Shifts = require("../models/shifts");

module.exports = {
  //lấy danh sách ca làm
  getShiftsList: (id) => {
    return Shifts
      .find({ company_id: id })
      .select(" name working_day time_start  time_end date_in_week shifts_code");
  },
   //lấy danh sách ca làm theo id
   getShiftsById: (id) => {
    return Shifts
      .find({ shifts_code: id })
      .select(" name working_day time_start  time_end date_in_week shifts_code");
  },

   //lấy danh sách ca làm theo ngày
   getShiftsByDay: (id) => {
    return Shifts
      .find({ shifts_code: id })
      .select(" name working_day time_start  time_end date_in_week shifts_code");
  },

  //thêm ca làm
  addShifts: (params) => {
    return new Shifts(params).save();
  },

  //sửa ca làm
  editShifts: (params, body) => {
    return Shifts.updateOne(
      { shifts_code: params.shifts_code, company_id: params.id },
      body
    );
  },
  //xoá ca làm
  deleteShifts: (params) => {
    return Shifts.deleteOne({ shifts_code: params.shifts_code, company_id: params.id });
  }, 
};
