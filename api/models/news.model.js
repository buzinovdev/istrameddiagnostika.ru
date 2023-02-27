const mongoose = require('mongoose')
const Schema = mongoose.Schema
const model = mongoose.model
const News = new Schema({
  type: {type: String, required: true},
  title: {type: String, required: true},
  preview: {type: String, required: true},
  img: {type: String, required: true},
  date: {type: Date, required: true},
  dateStart: {type: Date},
  toPromotion: {type: Boolean},
  dateEnd: {type: Date},
  content: {type: String}
})
News.pre(
  "save",
  async (data) => {
    console.log(data)
  }
)
module.exports = model("News", News)