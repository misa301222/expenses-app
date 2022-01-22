import { getSession } from "next-auth/react";
import ShowRooms from "../../../components/rooms/show-rooms";

function ShowRoomsPage({ data }: any) {
    return <ShowRooms data={data} />
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
    const response = await fetch(`${process.env.NEXTAUTH_URL}/api/rooms/roomsAPI`, {
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

export default ShowRoomsPage;