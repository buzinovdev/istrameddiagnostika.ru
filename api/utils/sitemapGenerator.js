const mongoose = require('mongoose')
const mongodbUri = process.env.MONGODB_URI
const Services = require('../models/services.model.js')
export default async function () {
  await mongoose.connect(mongodbUri, {useNewUrlParser: true, useUnifiedTopology: true})
  const services = await Services.find()
  const servisesPath = services.map(el => `/services/${el.path}`)
  const result = [...servisesPath]
  return result
}