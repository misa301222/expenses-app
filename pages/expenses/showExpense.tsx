import moment from "moment";
import { getSession } from "next-auth/react";
import ShowExpense from "../../components/expenses/show-expenses/show-expense";

function ShowExpensePage({ year, month, feeling }: any) {
    return <ShowExpense data={{ year, month, feeling }} />
}

// This gets called on every request
export async function getServerSideProps(context: any) {
    const session = await getSession({ req: context.req });
    if (!session) {
        return {
            redirect: {
                destination: '/',
                permanent: false,
            },
        };
    }

    const year = moment(new Date()).format('YYYY');
    const { req } = context;
    const { cookie } = req.headers;

    const [responseYear, responseMonth, responseFeeling] = await Promise.all([
        fetch(`http://localhost:3000/api/expenses/expensesAPI/expensesAPIYear/${year}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Cookie': cookie
            },
        }),
        fetch(`http://localhost:3000/api/expenses/expensesAPI/expensesAPIExpensesByMonth/${year}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Cookie': cookie
            },
        }),
        fetch(`http://localhost:3000/api/feeling/feelingAPI`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Cookie': cookie
            },
        }),
    ]);

    const [yearR, monthR, feelingR] = await Promise.all([
        responseYear.json(),
        responseMonth.json(),
        responseFeeling.json()
    ]);

    return { props: { year: yearR, month: monthR, feeling: feelingR } }
}

export default ShowExpensePage;