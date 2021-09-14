const Event = require('../Models/eventModel')
const response = require('../_helper/response')
const Message = require('../Models/messageModel')
const { isValidObjectId } = require('mongoose')

const EvenetController = {
    create: async (req, res) => {
        const event = new Event(req.body)

        //validate err
        let err = await event.validateSync()
        if (err) return response(res, 400, false, err)

        const saveEvent = await event.save()

        return response(res, 200, true, 'Sukses', saveEvent)
    },
    viewAllWithMessage: (req, res) => {
        Event.find().populate('message').exec((err, doc) => {
            if (err) return response(res, 500, false, err)
            return response(res, 200, true, 'Sukses', doc)
        })
    },
    viewWithMessage: (req, res) => {
        Event.findById(req.params.id_event).populate('message', null, null, {sort: {createdAt: -1}}).exec((err, doc) => {
            if (!doc) return response(res, 400, true, 'Ga ada Event dengan id tersebut')
            if (err) return response(res, 500, false, err)
            return response(res, 200, true, 'Sukses', doc)
        })
    },
    view: (req, res) => {
        Event.find((err, doc) => {
            if (err) return response(res, 500, false, err)
            return response(res, 200, true, 'Sukses', doc)
        })
    },
    delete: (req, res) => {
        Event.findByIdAndDelete(req.params.id_event, (err, event_data) => {
            if (!event_data) return response(res, 400, true, 'Ga ada Event dengan id tersebut')
            if (err) return response(res, 500, false, err)
            Message.deleteMany({event: event_data._id}, (err, doc) => {
                if (err) return response(res, 500, false, err)
                return response(res, 200, true, 'Event berhasil dihapus', {'Data': event_data ,'deletedMessages': doc})
            })
        })
    }
}

module.exports = EvenetController