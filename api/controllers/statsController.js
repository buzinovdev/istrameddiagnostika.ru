const StatsSocial = require('../models/stats/social.model.js')
const StatsMailing = require('../models/stats/mailing.model.js')
const StatsPhones = require('../models/stats/phones.model.js')
const bodyParser = require("body-parser")
bodyParser.urlencoded({extended: true})
module.exports.get = async function (req, res) {
  try {
    const social = await StatsSocial.find()
    const mailing = await StatsMailing.find()
    const phones = await StatsPhones.find()
    return res.json({social, mailing, phones})
  } catch (e) {
    console.log(e)
    return res.json({status: 400, msgActive: true, msgType: 'danger', msg: 'Ошибка при получении списка врачей'})
  }
}
module.exports.phones = async function (req, res) {
  try {
    await StatsPhones.create(req.body)
    return res.json(`Счетчик звонков обновлен`)
  } catch (e) {
    console.log(e)
    return res.json({status: 400, msg: `Счетчик звонков не обновлен`})
  }
}
module.exports.social = async function (req, res) {
  try {
    const {social} = req.body
    const stats = await StatsSocial.find()
    if (stats.length === 0) {
      await StatsSocial.create({social, count: 1})
    } else if (stats.findIndex(el => el.social === social) === -1) {
      await StatsSocial.create({social, count: 1})
    } else {
      await StatsSocial.updateOne({social}, {$inc: {count: 1}});
    }
    return res.json(`Счетчик социальных сетей обновлен`)
  } catch (e) {
    console.log(e)
    return res.json({status: 400, msg: `Счетчик социальных сетей не обновлен`})
  }
}
module.exports.mailing = async function (req, res) {
  try {
    const {email, date} = req.body
    console.log(email, date)
    await StatsMailing.create(req.body)
    return res.json({status: 200, msgActive: true, msgType: 'success', msg: 'Вы успешно подписались на рассылку'})
  } catch (e) {
    console.log(e)
    return res.json({status: 400, msg: `Счетчик рассылки не обновлен`})
  }
}