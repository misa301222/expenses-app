
import { getSession } from 'next-auth/react';

import UserProfile from '../components/profile/user-profile';

function ProfilePage({ data }: any) {
  return <UserProfile data={data} />;
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
  const response = await fetch(`http://localhost:3000/api/user/userAPI`, {
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

export default ProfilePage;