import mongoose from 'mongoose';

const feelingSchema = new mongoose.Schema({
    feeling: {
        type: String
    },
    feelingImageURL: {
        type: String
    }
}, { timestamps: true });

let Feeling = mongoose.models.feeling || mongoose.model('feeling', feelingSchema);
export default Feeling;