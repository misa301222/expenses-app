import Link from 'next/link';
import { useSession, signOut } from 'next-auth/react';
import classes from './main-navigation.module.scss';
import { faEnvelope, faHome, faMoneyBillWaveAlt, faMoneyCheck, faUserCircle, faUsers } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { motion } from 'framer-motion';

function MainNavigation() {
    const { data: session, status } = useSession();

    function logoutHandler() {
        localStorage.clear();
        signOut({
            callbackUrl: '/'
        });
    }

    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-dark">
            <div className="container-fluid d-flex">
                <div className={`${classes.navigationTitle}`}>
                    <Link href="/">Expenses App  </Link>
                    <FontAwesomeIcon icon={faMoneyBillWaveAlt} className={classes.green} />
                </div>
                <div className={``} id="navbarText">
                    <motion.ul 
                    whileHover={{
                        scale: 1.05
                    }}
                    transition={{
                        type: "spring"
                    }}
                    className={`navbar-nav me-auto mb-2 mb-lg-0 ${classes.centerMenu}`}>
                        <li className={`${classes.menuItem} nav-link nav-item`}>
                            <Link href="/"><h5 className=''><FontAwesomeIcon icon={faHome} /> Home</h5></Link>
                        </li>

                        {session && (
                            <li className={`${classes.menuItem} nav-link nav-item`}>
                                <Link href="/expenses/expensesMain"><h5 className=''><FontAwesomeIcon icon={faMoneyCheck} /> Expenses</h5></Link>
                            </li>
                        )}

                        {session && (
                            <li className={`${classes.menuItem} nav-link nav-item`}>
                                <Link href="/viewUsers/viewUsers"><h5 className=''><FontAwesomeIcon icon={faUsers} /> Users</h5></Link>
                            </li>
                        )}
                    </motion.ul>
                </div>

                <div className='col-sm-2'>
                    <ul className='navbar-nav me-auto mb-2 mb-lg-0 d-flex flex-row justify-content-end'>
                        {session && status == "authenticated" && (
                            <div className='d-flex flex-row justify-content-end align-items-end'>
                                <li className={`${classes.menuItem} nav-link nav-item`}>
                                    <Link href="/messages/viewMessages"><h5><FontAwesomeIcon icon={faEnvelope} /> Messages</h5></Link>
                                </li>

                                <li className={`${classes.menuItem} nav-link nav-item`}>
                                    <Link href="/profile"><h5><FontAwesomeIcon icon={faUserCircle} /> Profile</h5></Link>
                                </li>

                                <li className={`${classes.menuItem} nav-link nav-item`}>
                                    <button className='btn btn-danger btn-sm' onClick={logoutHandler}>Logout</button>
                                </li>
                            </div>
                        )}
                    </ul>
                </div>
            </div>
        </nav >
    );
}

export default MainNavigation;