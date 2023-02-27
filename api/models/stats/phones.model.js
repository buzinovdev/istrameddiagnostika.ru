const mongoose = require('mongoose')
const Schema = mongoose.Schema
const model = mongoose.model
const StatsPhones = new Schema({
  phone: {type: String, required: true},
  date: {type: Date, required: true}
})
StatsPhones.pre(
  "save",
  async (data) => {
    console.log(data)
  }
)
module.exports = model("StatsPhones", StatsPhones)