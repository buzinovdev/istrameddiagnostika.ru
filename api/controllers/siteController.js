const Sliders = require('../models/site/slider.model.js')
const bodyParser = require("body-parser")
const path = require("path")
const fs = require("fs")
bodyParser.urlencoded({extended: true})
module.exports.getSlider = async function (req, res) {
  try {
    const {slider: sliderName} = req.query
    const slider = sliderName ? await Sliders.findOne({name: sliderName}) : await Sliders.find()
    return res.json([...slider])
  } catch (e) {
    console.log(e)
    return res.json({status: 400, msgActive: true, msgType: 'danger', msg: 'Ошибка при получении списка услуг'})
  }
}
module.exports.addSlider = async function (req, res) {
  try {
    const {img} = req.body
    const tmpDir = path.join(__dirname?.split('/api')?.shift() + '/public/uploads/tmp')
    const uploadDir = path.join(__dirname?.split('/api')?.shift() + `/public/uploads/slider/`);
    if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir, '0777', true);
    fs.rename(`${tmpDir}/${img}`, `${uploadDir}/${img}`, function (err) {
      if (err) throw err
    })


    ////////////////////////
    await Sliders.insertMany([{img: 'img.png', description: ''}]).then(function () {
      return res.json({status: 400, msgActive: true, msgType: 'success', msg: 'Изображения слайдера добавлены'})
    }).catch(function (error) {
      return res.json({
        status: 400,
        msgActive: true,
        msgType: 'danger',
        msg: 'Ошибка при добавлении изображений слайдера'
      })
    });

    return res.json({status: 400, msgActive: true, msgType: 'success', msg: 'Изображения слайдера добавлены'})
  } catch (e) {
    console.log(e)
    return res.json({
      status: 400,
      msgActive: true,
      msgType: 'danger',
      msg: 'Ошибка при добавлении изображений слайдера'
    })
  }
}
module.exports.updateSlider = async function (req, res) {
  try {
    const {title, slideList} = req.body
    const tmpDir = path.join(__dirname?.split('/api')?.shift() + '/public/uploads/tmp')
    const uploadDir = path.join(__dirname?.split('/api')?.shift() + `/public/uploads/slider`);
    if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir, '0777', true);
    slideList.forEach(item => {
      fs.rename(`${tmpDir}/${item.img}`, `${uploadDir}/${item.img}`, function (err) {
        if (err) throw err
      })
    })
    await Sliders.updateOne({title: title}, {slides: slideList});
    return res.json({status: 200, msgActive: true, msgType: 'success', msg: 'Изображения слайдера обновлены'})
  } catch (e) {
    console.log(e)
    return res.json({
      status: 400,
      msgActive: true,
      msgType: 'danger',
      msg: 'Ошибка при обновлении изображений слайдера'
    })
  }
}