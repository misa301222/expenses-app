import { getSession } from 'next-auth/react';
import connectDB from '../../../config/connectDB';
import Expense from '../../../models/expenseModel';


connectDB();

async function handler(req: any, res: any) {
    if (req.method === 'POST') {
        const { description, quantitySpent, feeling, date, email } = req.body;
        const session = await getSession({ req });

        if (!session) {
            return res.status(400).json({ msg: "Invalid Authentication!" })
        }

        let expense = new Expense({
            description,
            quantitySpent,
            feeling,
            date,
            email
        });

        let status = await expense.save();
        res.status(201).json({ message: 'Expense created', ...status });
    }

    if (req.method === 'GET') {
        const session = await getSession({ req });
        if (!session) {
            return res.status(400).json({ msg: "Invalid Authentication!" })
        }
        const { email }: any = session.token;

        let expenses = await Expense.find({
            email: email
        });
        res.json(expenses);
    }

    if (req.method === 'PUT') {
        const session = await getSession({ req });
        if (!session) {
            return res.status(400).json({ msg: "Invalid Authentication!" })
        }

        const { expenseToUpdate }: any = req.body;

        let expense = await Expense.findByIdAndUpdate(
            expenseToUpdate._id,
            expenseToUpdate
        );

        res.json(expense);
    }

    if (req.method === 'DELETE') {
        const session = await getSession({ req });
        if (!session) {
            return res.status(400).json({ msg: "Invalid Authentication!" })
        }

        const { _id }: any = req.body;

        let expense = await Expense.findByIdAndDelete({
            _id: _id
        });

        console.log(expense);
        res.json(expense);
    }

}

export default handler;