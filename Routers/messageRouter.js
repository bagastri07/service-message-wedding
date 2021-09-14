const express = require('express')
const router = express.Router()

const MessageController = require('../Controllers/messageController')

router.post('/:id_event', MessageController.create)
router.get('/', MessageController.readAll)
router.delete('/:id_message', MessageController.delete)

module.exports = router