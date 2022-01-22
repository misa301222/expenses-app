import { getSession } from 'next-auth/react';
import connectDB from '../../../../config/connectDB';
import User from '../../../../models/userModel';


connectDB();

async function handler(req: any, res: any) {
    if (req.method === 'GET') {
        const session = await getSession({ req });
        if (!session) {
            return res.status(400).json({ msg: "Invalid Authentication!" })
        }
        const { nameToSearch }: any = req.query;
        const userRole: string = "USER";

        let user = await User.find({
            fullName: {
                $regex: '.*' + nameToSearch + '*.',
                $options: 'i'
            },
            role: userRole
        });
        res.json(user);
    }
}

export default handler;