import mongoose from 'mongoose'

const messageModel = new mongoose.Schema({
    userEmail: {
        type: String
    },
    message: {
        type: String
    },
    roomId: {
        type: mongoose.Schema.Types.ObjectId, ref: 'rooms'
    },
}, { timestamps: true })

let Message = mongoose.models.messages || mongoose.model('messages', messageModel)
export default Message;