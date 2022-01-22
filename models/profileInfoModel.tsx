import mongoose from 'mongoose';

const profileInfoSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId, ref: 'users'
    },
    descriptionHeader: {
        type: String,
        defaults: 'This is a header'
    },
    description: {
        type: String,
        defaults: 'This is a description'
    },
    hobbies: {
        type: [String],
        defaults: ''
    },
    education: {
        type: [String],
        defaults: ''
    },
    phoneNumber: {
        type: String,
        defaults: ''
    },
    imagesURL: {
        type: [String],
        defaults: ''
    },
    coverURL: {
        type: String,
        defaults: ''
    },
    location: {
        type: String,
        defaults: ''
    },
    jobs: {
        type: [String],
        defaults: ''
    }
}, { timestamps: true });

let ProfileInfo = mongoose.models.profileinfos || mongoose.model('profileinfos', profileInfoSchema);
export default ProfileInfo;