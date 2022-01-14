import { getSession } from 'next-auth/react';
import connectDB from '../../../config/connectDB';
import ProfileInfo from '../../../models/profileInfoModel';
import User from '../../../models/userModel';

connectDB();

async function handler(req: any, res: any) {
    if (req.method === 'GET') {
        const session = await getSession({ req })

        if (!session) {
            return res.status(400).json({ msg: "Invalid Authentication!" })
        }

        const { email }: any = session.token;
        let user = await User.findOne({
            email: email
        });

        const ObjectId = require('mongodb').ObjectID;
        let profileInfo = await ProfileInfo.findOne({
            userId: ObjectId(user._id)
        });

        res.json(profileInfo);
    }

    if (req.method === 'POST') {
        const { _id }: any = req.body;

        const ObjectId = require('mongodb').ObjectID;
        let profileInfo = new ProfileInfo({
            userId: ObjectId(_id),
            descriptionHeader: '',
            description: '',
            hobbies: [''],
            education: [''],
            phoneNumber: '',
            imagesURL: [''],
            coverURL: '',
            location: '',
            jobs: ['']
        });

        let status = await profileInfo.save();
        res.status(201).json({ message: 'ProfileInfo created', ...status });
    }

    if (req.method === 'PUT') {
        const session = await getSession({ req });

        if (!session) {
            return res.status(400).json({ msg: "Invalid Authentication!" })
        }

        const { editedProfileInfo }: any = req.body;
        // console.log(editedProfileInfo);

        let profileInfo = await ProfileInfo.findByIdAndUpdate(
            editedProfileInfo._id,
            editedProfileInfo,
            { new: true }
        );

        res.json(profileInfo);
    }

}

export default handler;