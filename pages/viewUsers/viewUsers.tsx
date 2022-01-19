import { getSession } from "next-auth/react";
import ViewUsers from "../../components/view-users/view-users";

function ViewUsersPage({ data }: any) {
    return <ViewUsers data={data} />
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

    const response = await fetch(`${process.env.NEXTAUTH_URL}/api/viewUser/viewUserAPI`, {
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

export default ViewUsersPage;