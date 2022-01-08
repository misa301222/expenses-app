import mongoose from 'mongoose';

const profileInfoSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId, ref: 'users'
    },
    descriptionHeader: {
        type: String
    },
    description: {
        type: String
    },
    hobbies: {
        type: [String]
    },
    education: {
        type: [String]
    },
    phoneNumber: {
        type: String
    },
    imagesURL: {
        type: [String]
    },
    coverURL: {
        type: String
    },
    location: {
        type: String
    },
    jobs: {
        type: [String]
    }
}, { timestamps: true });

let ProfileInfo = mongoose.models.profileinfos || mongoose.model('profileinfos', profileInfoSchema);
export default ProfileInfo;