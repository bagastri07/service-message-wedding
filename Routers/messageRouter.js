const express = require('express')
const router = express.Router()

const MessageController = require('../Controllers/messageController')

router.post('/', MessageController.create)
router.get('/', MessageController.readAll)

module.exports = router