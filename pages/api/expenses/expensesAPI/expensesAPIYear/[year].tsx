import { getSession } from "next-auth/react";
import connectDB from "../../../../../config/connectDB";
import Expense from "../../../../../models/expenseModel";

connectDB();
async function handler(req: any, res: any) {
    if (req.method === 'GET') {
        const { year } = req.query;
        const yearPlusOne: number = parseInt(year) + 1;
        const session = await getSession({ req });

        if (!session) {
            return res.status(400).json({ msg: "Invalid Authentication!" })
        }

        const { email }: any = session.token;

        let expenses = await Expense.find({
            date: {
                $gte: new Date(`1 Jan, ${year}`),
                $lt: new Date(`1 Jan, ${yearPlusOne}`)
            },
            email: email
        });
        res.json(expenses);
    }
}

export default handler;