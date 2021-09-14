const express = require('express')
const EvenetController = require('../Controllers/eventController')
const router = express.Router()

const EventController = require('../Controllers/eventController')

router.get('/raw', EventController.view)
router.post('/', EventController.create)
router.get('/', EventController.viewAllWithMessage)
router.get('/:id_event', EventController.viewWithMessage)
router.delete('/:id_event', EventController.delete)

module.exports = router