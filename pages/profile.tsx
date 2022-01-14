
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
    fetch(`http://localhost:3000/api/user/userAPI`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Cookie': cookie
      },
    }),
    fetch(`http://localhost:3000/api/profileInfo/profileInfoAPI`, {
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