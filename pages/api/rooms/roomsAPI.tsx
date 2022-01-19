import { getSession } from "next-auth/react";
import connectDB from "../../../config/connectDB";
import Message from "../../../models/messageModel";
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

        let room: any = await Room.findByIdAndUpdate(
            editedRoom._id,
            editedRoom,
            { new: true }
        );

        res.json(room);
    }

    if (req.method === 'POST') {
        const session = await getSession({ req });
        if (!session) {
            return res.status(400).json({ msg: "Invalid Authentication!" })
        }

        const { roomDescription } = req.body;

        let room = new Room({
            roomDescription: roomDescription,
            participants: 0,
            participantsEmails: []
        });

        let status = await room.save();
        res.status(201).json({ message: 'Room created', ...status });
    }

    if (req.method === 'DELETE') {
        const session = await getSession({ req });
        if (!session) {
            return res.status(400).json({ msg: "Invalid Authentication!" })
        }

        const { idToDelete } = req.body;
        const mongoose = require('mongoose');
        const ObjectId = require('mongodb').ObjectID;

        if (mongoose.Types.ObjectId.isValid(idToDelete)) {
            let messages = await Message.deleteMany({
                roomId: ObjectId(idToDelete)
            });

            let room = await Room.findByIdAndDelete({
                _id: idToDelete
            });
            if (room) {
                res.json(room);
            } else {
                res.status(422).json({ message: 'Not Found' });
            }
        } else {
            res.status(422).json({ message: 'Not Found' });
        }
    }

}

export default handler;