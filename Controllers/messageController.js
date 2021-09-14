const Message = require('../Models/messageModel')
const Event = require('../Models/eventModel')
const response = require('../_helper/response')

const MessageController = {
    create: async (req,res) => {
        const id_event = req.params.id_event

        const message = new Message({
            name: req.body.name,
            message: req.body.message,
            event: id_event
        })

        //validate err
        let err = await message.validateSync()
        if (err) return response(res, 400, false, err)

        Event.findByIdAndUpdate(id_event, {
            $push: {
                message: message._id
            }
        }, {new: true, runValidators: true}, async (err, doc) => {
            if (err) return response(res, 500, false, err)
            if (!doc) return response(res, 400, false, 'Tidak ada event dengan id tersebut')
            const saveMessage = await message.save()
            return response(res, 200, true, 'Sukses', {'event': doc ,'message': saveMessage})
        })
    },
    readAll: (req, res) => {
        Message.find({}).sort({createdAt: -1}).exec((err, doc) => {
            if (err) return response(res, 500, false, err)
            return response(res, 200, true, 'Sukses Cui', doc)
        })
    },
    delete: (req, res) => {
        Message.findByIdAndDelete(req.params.id_message, (err, message_data) => {
            if (err) return response(res, 500, false, err)
            if (!message_data) return response(res, 400, false, 'tidak ada message dengan id tersebut')
            Event.findByIdAndUpdate(message_data.event, {
                $pull: {
                    message: message_data._id
                }
            }, {new: true}, (err, doc) => {
                if (err) return response(res, 500, false, err)
                return response(res, 200, true, 'Message berhasil dihapus', {'event': doc, 'messsage': message_data})
            })
        })
    }
}

module.exports = MessageController