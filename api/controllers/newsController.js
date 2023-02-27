const News = require('../models/news.model.js')
const bodyParser = require("body-parser")
const path = require("path")
const fs = require("fs")
bodyParser.urlencoded({extended: true})
module.exports.get = async function (req, res) {
  try {
    const services = await News.find()
    return res.json(services)
  } catch (e) {
    console.log(e)
    return res.json({status: 400, msgActive: true, msgType: 'danger', msg: 'Ошибка при получении списка новостей'})
  }
}
module.exports.add = async function (req, res) {
  try {
    const {img} = req.body
    const tmpDir = path.join(__dirname?.split('/api')?.shift() + '/public/uploads/tmp')
    const uploadDir = path.join(__dirname?.split('/api')?.shift() + `/public/uploads/news/`);
    if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir, '0777', true);
    fs.rename(`${tmpDir}/${img}`, `${uploadDir}/${img}`, function (err) {
      if (err) throw err
    })
    await News.create(req.body)
    return res.json({status: 400, msgActive: true, msgType: 'success', msg: 'Новость добавлена'})
  } catch (e) {
    console.log(e)
    return res.json({status: 400, msgActive: true, msgType: 'danger', msg: 'Ошибка при добавлении новости'})
  }
}
module.exports.update = async function (req, res) {
  try {
    const {id, title, preview, img, content, toPromotion, date, dateStart, dateEnd} = req.body
    if (img.length > 0) {
      const tmpDir = path.join(__dirname?.split('/api')?.shift() + '/public/uploads/tmp')
      const uploadDir = path.join(__dirname?.split('/api')?.shift() + `/public/uploads/news/`);
      if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir, '0777', true);
      fs.rename(`${tmpDir}/${img}`, `${uploadDir}/${img}`, function (err) {
        if (err) throw err
      })
      await News.findByIdAndUpdate(id, {title, preview, img, content, toPromotion, date, dateStart, dateEnd});
    } else {
      await News.findByIdAndUpdate(id, {title, preview, content, toPromotion, date, dateStart, dateEnd});
    }
    return res.json({status: 200, msgActive: true, msgType: 'success', msg: 'Новость изменена'})
  } catch (e) {
    console.log(e)
    return res.json({status: 400, msgActive: true, msgType: 'danger', msg: 'Ошибка при изменении новости'})
  }
}
module.exports.delete = async function (req, res) {
  try {
    const {id} = req.body
    await News.deleteOne({_id: id});
    return res.json({status: 200, msgActive: true, msgType: 'success', msg: `Новость удалена`})
  } catch (e) {
    console.log(e)
    return res.json({status: 400, msgActive: true, msgType: 'danger', msg: 'Ошибка при удалении новости'})
  }
}