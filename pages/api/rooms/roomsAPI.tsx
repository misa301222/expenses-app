import { getSession } from "next-auth/react";
import connectDB from "../../../config/connectDB";
import Room from "../../../models/roomModel";

connectDB();

async function handler(req: any, res: any) {
    if (req.method === 'GET') {
        const session = await getSession({ req });
        if (!session) {
            return res.status(400).json({ msg: "Invalid Authentication!" })
        }
        let rooms = await Room.find();
        res.json(rooms);
    }

    if (req.method === 'PUT') {
        const session = await getSession({ req });
        if (!session) {
            return res.status(400).json({ msg: "Invalid Authentication!" })
        }

        const { editedRoom }: any = req.body;
        const { email }: any = session.token;
        const ObjectId = require('mongodb').ObjectID;
        // currentEmail.push(email);

        let room: any = await Room.findByIdAndUpdate(
            editedRoom._id,
            editedRoom,
            { new: true }
        );

        res.json(room);
    }

}

export default handler;