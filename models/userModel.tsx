import mongoose from 'mongoose'

const userSchema = new mongoose.Schema({
    fullName: {
        type: String,
        default: 'guest'
    },
    email: {
        type: String
    },
    password: {
        type: String
    },
    imageURL: {
        type: String,
        default: ''
    },
    role: {
        type: String,
        default: 'USER'
    },
    privateInfo: {
        type: Boolean,
        defalult: false
    }
}, { timestamps: true })

let User = mongoose.models.users || mongoose.model('users', userSchema)
export default User;