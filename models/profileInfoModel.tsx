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
    }
});

let ProfileInfo = mongoose.models.profileInfo || mongoose.model('profileInfo', profileInfoSchema);
export default ProfileInfo;