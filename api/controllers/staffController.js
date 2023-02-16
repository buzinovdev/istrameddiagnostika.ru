const Staff = require('../models/staff.model.js')
const bodyParser = require("body-parser")
bodyParser.urlencoded({extended: true})
module.exports.get = async function (req, res) {
  try {
    const staff = await Staff.find()
    return res.json(staff)
  } catch (e) {
    console.log(e)
    return res.json({status: 400, msgActive: true, msgType: 'danger', msg: 'Ошибка при получении списка врачей'})
  }
}
module.exports.add = async function (req, res) {
  try {
    const {person} = req.body
    await Staff.create(req.body)
    return res.json({status: 400, msgActive: true, msgType: 'success', msg: `${person} добавлен базу данных`})
  } catch (e) {
    console.log(e)
    return res.json({status: 400, msgActive: true, msgType: 'danger', msg: 'Ошибка при добавлении специалиста'})
  }
}
module.exports.update = async function (req, res) {
  try {
    const {id, person, services, desc, worktime} = req.body
    await Staff.findByIdAndUpdate(id, { person, services, desc, worktime});
    return res.json({status: 200, msgActive: true, msgType: 'success', msg: `Данные врача обновлены`})
  } catch (e) {
    console.log(e)
    return res.json({status: 400, msgActive: true, msgType: 'danger', msg: 'Ошибка при обновлении данных врача'})
  }
}
module.exports.delete = async function (req, res) {
  try {
    const {id} = req.body
    await Staff.deleteOne({_id:id});
    return res.json({status: 200, msgActive: true, msgType: 'success', msg: `Врач удален`})
  } catch (e) {
    console.log(e)
    return res.json({status: 400, msgActive: true, msgType: 'danger', msg: 'Ошибка при удалении врача'})
  }
}