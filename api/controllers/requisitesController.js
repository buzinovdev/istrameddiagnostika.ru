const Requisites = require('../models/requisites.model.js')
const bodyParser = require("body-parser")
bodyParser.urlencoded({extended: true})
module.exports.get = async function (req, res) {
  try {
    const requisites = await Requisites.find()
    const data = requisites.length > 0 ? requisites[0] : {}
    return res.json(data)
  } catch (e) {
    console.log(e)
    return res.json({status: 400, msgActive: true, msgType: 'danger', msg: 'Ошибка при получении реквизитов'})
  }
}
module.exports.update = async function (req, res) {
  try {
    const {
      id,
      address,
      worktime,
      invitro,
      inn,
      kpp,
      ogrn,
      okpo,
      bank,
      rs,
      ks,
      bik,
      email,
      phones,
      chiefDoc,
      chiefDocPhones,
      chiefDocEmail,
      gendir,
      gendirPhones,
      gendirEmail,
      glbuh,
      glbuhPhones,
      glbuhEmail
    } = req.body
    await Requisites.findByIdAndUpdate(id, {
      address,
      worktime,
      invitro,
      inn,
      kpp,
      ogrn,
      okpo,
      bank,
      rs,
      ks,
      bik,
      email,
      phones,
      chiefDoc,
      chiefDocPhones,
      chiefDocEmail,
      gendir,
      gendirPhones,
      gendirEmail,
      glbuh,
      glbuhPhones,
      glbuhEmail
    });
    return res.json({status: 200, msgActive: true, msgType: 'success', msg: `Реквизиты обновлены`})
  } catch (e) {
    console.log(e)
    return res.json({status: 400, msgActive: true, msgType: 'danger', msg: 'Ошибка при обновлении реквизитов'})
  }
}