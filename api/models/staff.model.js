const mongoose = require('mongoose')
const Schema = mongoose.Schema
const model = mongoose.model
const Staff = new Schema({
  person:{type: String, required: true},
  services:{type: String, required: true},
  desc:{type: String, required: true},
  worktime:{type: Array}
})
Staff.pre(
  "save",
  async (data) => {
    console.log(data)
  }
)
module.exports = model("Staff", Staff)