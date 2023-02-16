const express = require('express')
const router = express.Router()
const controller = require('../controllers/newsController')
const authMiddleware = require('../middleware/authMiddleware')
router.get('/get', controller.get)
router.post('/add',authMiddleware, controller.add)
router.post('/update',authMiddleware, controller.update)
router.post('/delete',authMiddleware, controller.delete)
module.exports = router