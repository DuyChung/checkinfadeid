var location = require("../models/location");

module.exports = {
  //lấy danh sách vị trí
  getLocationsList: (id) => {
    return location
      .find({ company_id: id })
      .select(" name location company_id ");
  },
  //thêm vị trí
  addLocation: (params) => {
    return  new location(params).save();
  },

  //sửa vị trí
  editLocation: (id, body) => {
    return location.updateOne(
      { company_id: id },
      body
    );
  },
  //xoá vị trí
  deleteLocation: (id) => {
    return location.deleteOne({ company_id: id });
  },
};
