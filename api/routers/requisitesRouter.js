const express = require('express')
const router = express.Router()
const controller = require('../controllers/requisitesController')
const authMiddleware = require('../middleware/authMiddleware')
router.get('/get', controller.get)
router.post('/update',authMiddleware, controller.update)
module.exports = router