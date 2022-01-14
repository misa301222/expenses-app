import { getSession } from "next-auth/react";
import ViewMessages from "../../components/messages/view-messages";


function ViewMessagesPage({ rooms, user }: any) {
    return <ViewMessages data={{ rooms, user }} />
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

    const [responseRooms, responseUser] = await Promise.all([
        fetch(`http://localhost:3000/api/rooms/roomsAPI`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Cookie': cookie
            },
        }),
        fetch(`http://localhost:3000/api/user/userAPI`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Cookie': cookie
            },
        })
    ])

    const [responseR, userR] = await Promise.all([
        responseRooms.json(),
        responseUser.json()
    ]);

    return { props: { rooms: responseR, user: userR } }
}


export default ViewMessagesPage;