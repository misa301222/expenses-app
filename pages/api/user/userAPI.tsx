import { getSession } from 'next-auth/react';
import connectDB from '../../../config/connectDB';
import User from '../../../models/userModel';


connectDB();

async function handler(req: any, res: any) {
    if (req.method === 'GET') {
        const session = await getSession({ req });
        if (!session) {
            return res.status(400).json({ msg: "Invalid Authentication!" })
        }
        const { email }: any = session.user;
        let user = await User.findOne({
            email: email
        });
        res.json(user);
    }

    if (req.method === 'PUT') {
        const session = await getSession({ req });
        if (!session) {
            return res.status(400).json({ msg: "Invalid Authentication!" })
        }

        const { editedUser }: any = req.body;
        let user = await User.findByIdAndUpdate(
            editedUser._id,
            editedUser,
            { new: true },
        );
        res.json(user);
    }
}

export default handler;