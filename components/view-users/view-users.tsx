import Link from 'next/link';
import { useEffect, useState } from 'react';
import classes from './view-users.module.scss';

function ViewUsers({ data }: any) {
    const [users, setUsers] = useState([{
        email: ''
    }]);

    useEffect(() => {
        console.log(data);
        setUsers(data);
    }, [])

    return (
        <div className='container'>
            <p>View users works</p>
            {
                data.map((element: any, index: number) => (
                    // <p key={index}>{JSON.stringify(element)}</p>
                    <div className='mb-3' key={index}>
                        <Link href={`/viewProfile/${element.email}`}>{element.email}</Link>
                    </div>
                ))
            }
        </div>
    );
}

export default ViewUsers;