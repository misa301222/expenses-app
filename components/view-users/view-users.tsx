import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { ChangeEvent, SyntheticEvent, useEffect, useState } from 'react';
import classes from './view-users.module.scss';


async function searchByName(nameToSearch: string) {
    if (nameToSearch.trim()) {
        const response = await fetch(`/api/viewUser/searchByName/${nameToSearch}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message || 'Something went wrong!');
        }
        return data;
    } else {
        const response = await fetch(`http://localhost:3000/api/viewUser/viewUserAPI`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message || 'Something went wrong!');
        }
        return data;
    }
}

function ViewUsers({ data }: any) {
    const [users, setUsers] = useState([{
        email: ''
    }]);

    const [searchUser, setSearchUser] = useState('');

    const handleOnChangeSearchUser = (event: ChangeEvent<HTMLInputElement>) => {
        setSearchUser(event.target.value);
    }

    const handleOnSubmitSearch = async (event: SyntheticEvent) => {
        event.preventDefault();
        const response = await searchByName(searchUser);
        setUsers(response);
    }

    useEffect(() => {
        console.log(data);
        setUsers(data);
    }, []);

    return (
        <div className='container container-data'>
            <form className='' onSubmit={handleOnSubmitSearch}>
                <div className='container d-flex flex-row justify-content-center'>

                    <div className='col-sm-4'>
                        <input type='text' className='form-control' onChange={handleOnChangeSearchUser} />
                    </div>

                    <div className='col-sm-1'>
                        <button className='btn btn-light btn-outline-dark'><FontAwesomeIcon icon={faSearch} /></button>
                    </div>
                </div>
            </form>
            <h2><u>Users</u></h2>
            <div className='d-flex flex-column align-items-center' >
                {
                    users.length ?
                        users.map((element: any, index: number) => (
                            <Link href={`/viewProfile/${element.email}`} key={index}>
                                <motion.div
                                    whileHover={{
                                        scale: 1.05
                                    }}
                                    transition={{
                                        duration: 0.2
                                    }}
                                    className={`d-flex flex-row ${classes.cardStyle} w-75 mb-5`}>
                                    <div className='col-sm-2'>
                                        {element.imageURL ?
                                            <img src={element.imageURL} className={`${classes.imageThumbnail}`} />
                                            :
                                            <img src='/static/images/Blank.png' className={classes.imageThumbnail} />
                                        }
                                    </div>

                                    <div className='col'>
                                        <br></br>
                                        <div className='container'>
                                            <h6 className='fw-bold'>{element.fullName}</h6>
                                            <h6 className='text-muted'>{element.email}</h6>
                                        </div>
                                    </div>
                                </motion.div>
                            </Link>
                        ))
                        :
                        <h4 className='text-danger fst-italic'>No user(s) found!</h4>
                }
            </div>
        </div >
    );
}

export default ViewUsers;