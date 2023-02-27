const mongoose = require('mongoose')
const Schema = mongoose.Schema
const model = mongoose.model
const StatsMailing = new Schema({
  email: {type: String, required: true},
  date: {type: Date, required: true}
})
StatsMailing.pre(
  "save",
  async (data) => {
    console.log(data)
  }
)
module.exports = model("StatsMailing", StatsMailing)