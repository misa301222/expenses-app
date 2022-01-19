import { NextApiRequest } from 'next';
import { getSession } from 'next-auth/react';
import connectDB from '../../../../config/connectDB';
import Message from '../../../../models/messageModel';
import { NextApiResponseServerIO } from '../../../../types/next';

connectDB();

async function handler(req: NextApiRequest, res: NextApiResponseServerIO) {
    if (req.method === 'POST') {
        const session = await getSession({ req });
        if (!session) {
            return res.status(400).json({ msg: "Invalid Authentication!" })
        }
        const { message } = req.body;
        const { roomId }: any = req.query;
        const email: string = '-- GENERAL MESSAGE --';

        // dispatch to channel "message"
        res?.socket?.server?.io?.emit("message", message, email, roomId);

        const ObjectId = require('mongodb').ObjectID;
        let newMessage = new Message({
            userEmail: email,
            message: message,
            roomId: ObjectId(roomId)
        });

        const status = await newMessage.save();
        res.status(201).json({ message: 'Message Created', ...status });
    }
}

export default handler;