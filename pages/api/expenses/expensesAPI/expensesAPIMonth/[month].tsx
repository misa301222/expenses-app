import moment from "moment";
import { getSession } from "next-auth/react";
import connectDB from "../../../../../config/connectDB";
import Expense from "../../../../../models/expenseModel";

connectDB();
async function handler(req: any, res: any) {
    if (req.method === 'GET') {
        const year = moment(new Date()).format('YYYY');
        // const { month } = req.query;
        const yearPlusOne: number = parseInt(year) + 1;
        // const monthQuery = moment(parseInt(month) + 1, 'MM').format('MMM');
        const session = await getSession({ req });

        if (!session) {
            return res.status(400).json({ msg: "Invalid Authentication!" })
        }

        // console.log('days in month: ' + moment(`${year}-${parseInt(month) + 1}`).daysInMonth());
        const { email }: any = session.token;
        /*
        let expenses = await Expense.find({
            date: {
                $gte: new Date(`1 ${monthQuery}, ${year}`),
                $lt: new Date(`31 ${monthQuery}, ${year}`)
            },
            email: email
        });
        */
        let monthlyArray: any = {
            '01': [],
            '02': [],
            '03': [],
            '04': [],
            '05': [],
            '06': [],
            '07': [],
            '08': [],
            '09': [],
            '10': [],
            '11': [],
            '12': [],
        };

        let expenses = await Expense.find({
            date: {
                $gte: new Date(`1 Jan, ${year}`),
                $lt: new Date(`31 Jan, ${yearPlusOne}`)
            },
            email: email
        });

        for (let i = 0; i < expenses.length; i++) {
            let key: string = moment(expenses[i].date.toString()).format('MM/DD/YYYY').split('/')[0];
            monthlyArray[key].push(expenses[i]);
        }

        let expensesByMonth: any = {
            '01': 0,
            '02': 0,
            '03': 0,
            '04': 0,
            '05': 0,
            '06': 0,
            '07': 0,
            '08': 0,
            '09': 0,
            '10': 0,
            '11': 0,
            '12': 0,
        }
        Object.entries(monthlyArray).forEach(
            ([key, value]: any) => {
                let sum = 0;
                for (let i = 0; i < value.length; i++) {
                    let object: any = value[i];
                    sum += object.quantitySpent;
                }
                expensesByMonth[key] = sum;
            }
        );
        res.json(expensesByMonth);
    }
}

export default handler;