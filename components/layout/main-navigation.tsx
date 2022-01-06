import Link from 'next/link';
import { useSession, signOut } from 'next-auth/react';
import classes from './main-navigation.module.scss';
import { faMoneyBillWaveAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

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
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className={`${classes.menuItem} nav-link nav-item`}>
                            <Link href="/">Home</Link>
                        </li>

                        {session && (
                            <li className={`${classes.menuItem} nav-link nav-item`}>
                                <Link href="/expenses/expensesMain">Expenses</Link>
                            </li>
                        )}
                    </ul>
                </div>

                <div className='col-2'>
                    <ul className='navbar-nav me-auto mb-2 mb-lg-0'>
                        {session && status == "authenticated" && (
                            <div className='d-flex flex-row justify-content-end align-items-end container'>
                                <li className={`${classes.menuItem} nav-link nav-item`}>
                                    {/* <Link href="profile">{localStorage.getItem('email')}</Link> */}
                                    <Link href="/profile">Profile</Link>
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