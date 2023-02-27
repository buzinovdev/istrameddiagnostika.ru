const mongoose = require('mongoose')
const Schema = mongoose.Schema
const model = mongoose.model
const Sliders = new Schema({
  title: {type: String, required: true},
  name: {type: String, required: true},
  slides: [{
    index: {type: Number, required: true},
    img: {type: String, required: true},
    description: {type: String}
  }]
})
Sliders.pre(
  "save",
  async (data) => {
    console.log(data)
  }
)
module.exports = model("Sliders", Sliders)