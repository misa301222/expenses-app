import moment from "moment";
import ShowExpense from "../../components/expenses/show-expenses/show-expense";

function ShowExpensePage({ year, month }: any) {
    return <ShowExpense data={{ year, month }} />
}

// This gets called on every request
export async function getServerSideProps(context: any) {
    const year = moment(new Date()).format('YYYY');
    const month = moment(new Date()).month();
    const { req } = context;
    const { cookie } = req.headers;

    const [responseYear, responseMonth] = await Promise.all([
        fetch(`http://localhost:3000/api/expenses/expensesAPI/expensesAPIYear/${year}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Cookie': cookie
            },
        }),
        fetch(`http://localhost:3000/api/expenses/expensesAPI/expensesAPIMonth/${month}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Cookie': cookie
            },
        }),
    ]);

    const [yearR, monthR] = await Promise.all([
        responseYear.json(),
        responseMonth.json()
    ]);

    return { props: { year: yearR, month: monthR } }
}

export default ShowExpensePage;