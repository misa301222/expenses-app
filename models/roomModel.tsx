import mongoose from 'mongoose'

const roomSchema = new mongoose.Schema({
    roomDescription: {
        type: String,
        default: 'New Room'
    },
    participants: {
        type: Number,
        default: 0
    },
    participantsEmails: {
        type: [String]
    }
}, { timestamps: true })

let Room = mongoose.models.rooms || mongoose.model('rooms', roomSchema)
export default Room;