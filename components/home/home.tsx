import { faMoneyBillWaveAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import AuthForm from "../auth/auth-form";
import classes from './home.module.scss';

function Home() {
    return (
        <div className={classes.moneyBackground}>
            <div className="container">
                <h1 className={`${classes.header} text-center fw-bold`}>
                    Welcome to Expenses App! <FontAwesomeIcon icon={faMoneyBillWaveAlt} className={classes.green}/>
                </h1>
                <br></br>
            </div>

            <div className="container">
                <AuthForm />
            </div>
        </div>
    )
}

export default Home;