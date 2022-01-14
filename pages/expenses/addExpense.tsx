import { getSession } from "next-auth/react";
import AddExpenses from "../../components/expenses/add-expenses/add-expenses";

function addExpensePage({ data }: any) {
    return <AddExpenses data={data} />
}

export default addExpensePage;

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

    const { req } = context;
    const { cookie } = req.headers;
    const response = await fetch(`http://localhost:3000/api/feeling/feelingAPI`, {
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