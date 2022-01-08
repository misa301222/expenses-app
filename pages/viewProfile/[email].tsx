import { getSession } from "next-auth/react";
import ViewProfile from "../../components/view-profile/view-profile";

function ViewProfilePage({ profile, user, expenses }: any) {
    return <ViewProfile data={{ profile, user, expenses }} />
}

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
    const { email } = context.params;

    const [responseProfile, responseUser, responseExpenses] = await Promise.all([
        fetch(`http://localhost:3000/api/viewProfile/${email}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Cookie': cookie
            },
        }),
        fetch(`http://localhost:3000/api/viewUser/${email}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Cookie': cookie
            },
        }),
        fetch(`http://localhost:3000/api/expenses/${email}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Cookie': cookie
            },
        }),
    ]);

    const [profileR, userR, expensesR] = await Promise.all([
        responseProfile.json(),
        responseUser.json(),
        responseExpenses.json()
    ]);

    return { props: { profile: profileR, user: userR, expenses: expensesR } }

}

export default ViewProfilePage;