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
        //TODO FIX SEARCH
        // let profileInfo = await ProfileInfo.findOne({
        //     userId: user._id
        // });

        // const id = '61cd2cb57f3c4e9a59e31acd';

        const ObjectId = require('mongodb').ObjectID;
        let profileInfo = await ProfileInfo.findOne({
            users: ObjectId(user._id)
        });


        console.log(profileInfo);

        res.json(profileInfo);
    }

}

export default handler;