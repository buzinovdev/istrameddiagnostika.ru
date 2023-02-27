const express = require('express')
const router = express.Router()
const controller = require('../controllers/siteController')
const authMiddleware = require('../middleware/authMiddleware')
router.get('/getSlider', controller.getSlider)
router.post('/addSlider',authMiddleware, controller.addSlider)
router.post('/updateSlider',authMiddleware, controller.updateSlider)
module.exports = router