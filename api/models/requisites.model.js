const mongoose = require('mongoose')
const Schema = mongoose.Schema
const model = mongoose.model
const Requisites = new Schema({
  address:{type: String, required: true},
  inn:{type: String, required: true},
  kpp:{type: String, required: true},
  ogrn:{type: String, required: true},
  okpo:{type: String, required: true},
  bank:{type: String, required: true},
  rs:{type: String, required: true},
  ks:{type: String, required: true},
  bik:{type: String, required: true},
  email:{type: String, required: true},
  phones:{type: Array, required: true},
  chiefDoc:{type: String},
  chiefDocPhones:{type: Array},
  chiefDocEmail:{type: String},
  gendir:{type: String},
  gendirPhones:{type: Array},
  gendirEmail:{type: String},
  glbuh:{type: String},
  glbuhPhones:{type: Array},
  glbuhEmail:{type: String},
  worktime:{type: String, required: true},
  invitro:{type: String, required: true}
})
Requisites.pre(
  "save",
  async (data) => {
    console.log(data)
  }
)
module.exports = model("Requisites", Requisites)