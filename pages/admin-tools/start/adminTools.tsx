import { getSession } from "next-auth/react";
import AdminTools from "../../../components/admin-tools/admin-tools";

function AdminToolsPage() {
    return <AdminTools />
}

export async function getServerSideProps(context: any) {
    const session = await getSession({ req: context.req });
    const { role }: any = session?.user;
    if (!session || role === 'USER') {
        return {
            redirect: {
                destination: '/',
                permanent: false,
            },
        };
    }

    return { props: {} }
}

export default AdminToolsPage;

