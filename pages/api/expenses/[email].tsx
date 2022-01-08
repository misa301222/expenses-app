import { getSession } from 'next-auth/react';
import connectDB from '../../../config/connectDB';
import Expense from '../../../models/expenseModel';


connectDB();

async function handler(req: any, res: any) {
    if (req.method === 'GET') {
        const session = await getSession({ req });
        if (!session) {
            return res.status(400).json({ msg: "Invalid Authentication!" })
        }
        const { email }: any = req.query;

        let expenses = await Expense.find({
            email: email
        });

        let data: any = {
            lifeTimeSpent: 0,
            mostExpensiveDescription: '',
            mostExpensiveQuantity: 0,
        }

        let mostExpensiveDescription: string = '';
        let mostExpensiveQuantity: number = 0;
        let lifeTimeSpent: number = 0;

        for (let i = 0; i < expenses.length; i++) {
            lifeTimeSpent += expenses[i].quantitySpent;
            if (expenses[i].quantitySpent >= mostExpensiveQuantity) {
                mostExpensiveDescription = expenses[i].description;
                mostExpensiveQuantity = expenses[i].quantitySpent;
            }
        }
        data.lifeTimeSpent = lifeTimeSpent;
        data.mostExpensiveDescription = mostExpensiveDescription;
        data.mostExpensiveQuantity = mostExpensiveQuantity;
        
        res.json(data);
    }
}

export default handler;