const Message = require('../Models/messageModel')
const response = require('../_helper/response')

const MessageController = {
    create: async (req,res) => {
        const messageData = req.body
        const message = new Message(messageData)

        //validate err
        let err = await message.validateSync()
        if (err) return response(res, 400, false, err)

        const saveMessage = await message.save()

        return response(res, 200, true, 'Sukses', saveMessage)
    },
    readAll: (req, res) => {
        Message.find({}).sort({createdAt: -1}).exec((err, doc) => {
            if (err) return response(res, 500, false, err)
            return response(res, 200, true, 'Sukses Cui', doc)
        })
    }
}

module.exports = MessageController