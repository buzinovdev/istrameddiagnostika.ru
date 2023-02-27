const express = require('express')
const router = express.Router()
const controller = require('../controllers/statsController')
const authMiddleware = require('../middleware/authMiddleware')
router.get('/get', authMiddleware, controller.get)
router.post('/phones', controller.phones)
router.post('/social', controller.social)
router.post('/mailing', controller.mailing)
module.exports = router