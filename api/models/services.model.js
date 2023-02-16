const mongoose = require('mongoose')
const Schema = mongoose.Schema
const model = mongoose.model
const Services = new Schema({
  title: {type: String, required: true},
  path: {type: String, required: true},
  img: {type: String, required: true},
  list: {type: Array},
  content: {type: String}
})
Services.pre(
  "save",
  async (data) => {
    console.log(data)
  }
)
module.exports = model("Services", Services)