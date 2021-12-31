import moment from "moment";
import ExpensesHome from "../../components/expenses/expenses-home";

function ExpensesMainPage({ data }: any) {
    return (
        <ExpensesHome data={data} />
    )
}

// This gets called on every request
export async function getServerSideProps(context: any) {
    const month = moment(new Date()).month();
    const { req } = context;
    const { cookie } = req.headers;

    const response = await fetch(`http://localhost:3000/api/expenses/expensesAPI/expensesAPIMonth/${month}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Cookie': cookie
        },
    });
    const data = await response.json();
    if (!response.ok) {
        throw new Error(data.message || 'Something went wrong!');
    }
    return { props: { data } }
}

export default ExpensesMainPage;