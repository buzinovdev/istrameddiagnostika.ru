const mongoose = require('mongoose')
const Schema = mongoose.Schema
const model = mongoose.model
const StatsSocials = new Schema({
  social: {type: String, required: true},
  count: {type: Number, required: true}
})
StatsSocials.pre(
  "save",
  async (data) => {
    console.log(data)
  }
)
module.exports = model("StatsSocial", StatsSocials)