const express = require('express')
const router = express.Router()
const controller = require('../controllers/servicesController')
const authMiddleware = require('../middleware/authMiddleware')
router.get('/get', controller.get)
router.post('/add',authMiddleware, controller.add)
router.post('/update',authMiddleware, controller.update)
module.exports = router