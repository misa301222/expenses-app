import moment from "moment";
import { getSession } from "next-auth/react";
import ExpensesHome from "../../components/expenses/expenses-home";

function ExpensesMainPage({ data }: any) {
    return (
        <ExpensesHome data={data} />
    )
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

    const response = await fetch(`${process.env.NEXTAUTH_URL}/api/expenses/expensesAPI/expensesAPIExpensesByMonth/${year}`, {
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