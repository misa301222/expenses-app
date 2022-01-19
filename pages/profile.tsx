
import { getSession } from 'next-auth/react';

import UserProfile from '../components/profile/user-profile';

function ProfilePage({ currentUser, profileInfo }: any) {
  return <UserProfile data={{ currentUser, profileInfo }} />;
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
  const [responseUser, responseProfileInfo] = await Promise.all([
    fetch(`${process.env.NEXTAUTH_URL}/api/user/userAPI`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Cookie': cookie
      },
    }),
    fetch(`${process.env.NEXTAUTH_URL}/api/profileInfo/profileInfoAPI`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Cookie': cookie
      },
    })
  ]);


  const [userR, profileInfoR] = await Promise.all([
    responseUser.json(),
    responseProfileInfo.json()
  ]);

  return { props: { currentUser: userR, profileInfo: profileInfoR } }
}

export default ProfilePage;