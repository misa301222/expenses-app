import { getSession } from 'next-auth/react';
import connectDB from '../../../config/connectDB';
import Feeling from '../../../models/feelingModel';

connectDB();

async function handler(req: any, res: any) {
    if (req.method === 'GET') {
        const session = await getSession({ req })

        if (!session) {
            return res.status(400).json({ msg: "Invalid Authentication!" })
        }

        let feeling = await Feeling.find({});
        res.json(feeling);
    }
}

export default handler;