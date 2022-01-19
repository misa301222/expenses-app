import { getSession } from 'next-auth/react';
import connectDB from '../../../../config/connectDB';
import Room from '../../../../models/roomModel';

connectDB();

async function handler(req: any, res: any) {
    if (req.method === 'GET') {
        const session = await getSession({ req });
        if (!session) {
            return res.status(400).json({ msg: "Invalid Authentication!" })
        }
        const { roomId }: any = req.query;
        const { email }: any = session.user;
        const ObjectId = require('mongodb').ObjectID;

        let room: any = await Room.findOne({
            _id: ObjectId(roomId),
        });

        let result: boolean = false;
        room.participantsEmails.includes(email) ? result = true : result = false;
        res.json(result);
    }
}

export default handler;