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

        // const { email }: any = session.token;
        const { email } = req.query;
        console.log(email);
        let user = await User.findOne({
            email: email
        });
        
        const ObjectId = require('mongodb').ObjectID;
        let profileInfo = await ProfileInfo.findOne({
            userId: ObjectId(user._id)
        });
                
        res.json(profileInfo);
    }

}

export default handler;