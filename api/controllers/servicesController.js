const Services = require('../models/services.model.js')
const bodyParser = require("body-parser")
const path = require("path")
const fs = require("fs")
bodyParser.urlencoded({extended: true})
module.exports.get = async function (req, res) {
  try {
    const services = await Services.find()
    return res.json(services)
  } catch (e) {
    console.log(e)
    return res.json({status: 400, msgActive: true, msgType: 'danger', msg: 'Ошибка при получении списка услуг'})
  }
}
module.exports.add = async function (req, res) {
  try {
    const {img} = req.body
    const tmpDir = path.join(__dirname?.split('/api')?.shift() + '/public/uploads/tmp')
    const uploadDir = path.join(__dirname?.split('/api')?.shift() + `/public/uploads/services/`);
    if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir, '0777', true);
    fs.rename(`${tmpDir}/${img}`, `${uploadDir}/${img}`, function (err) {
      if (err) throw err
    })
    await Services.create(req.body)
    return res.json({status: 400, msgActive: true, msgType: 'success', msg: 'Услуга добавлена'})
  } catch (e) {
    console.log(e)
    return res.json({status: 400, msgActive: true, msgType: 'danger', msg: 'Ошибка при добавлении услуги'})
  }
}
module.exports.update = async function (req, res) {
  try {
    const {id, title, path, img, list, content} = req.body
    if (img.length > 0) {
      const tmpDir = path.join(__dirname?.split('/api')?.shift() + '/public/uploads/tmp')
      const uploadDir = path.join(__dirname?.split('/api')?.shift() + `/public/uploads/services/${path}`);
      if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir, '0777', true);
      fs.rename(`${tmpDir}/${img}`, `${uploadDir}/${img}`, function (err) {
        if (err) throw err
      })
      await Services.findByIdAndUpdate(id, {title, path, img, list, content});
    } else {
      await Services.findByIdAndUpdate(id, {title, path, list, content});
    }
    return res.json({status: 200, msgActive: true, msgType: 'success', msg: 'Услуга обновлен'})
  } catch (e) {
    console.log(e)
    return res.json({status: 400, msgActive: true, msgType: 'danger', msg: 'Ошибка при обновлении услуги'})
  }
}