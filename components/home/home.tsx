import { faMoneyBillAlt, faMoneyBillWaveAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { motion } from "framer-motion";
import Head from "next/head";
import AuthForm from "../auth/auth-form";
import classes from './home.module.scss';

function Home() {
    return (
        <div>
            <Head>
                <title>Expenses App</title>
                <meta name="viewport" content="initial-scale=1.0, width=device-width" />
            </Head>
            <div className={`${classes.moneyBackground}`}>
                <div className="container">
                    <motion.h1
                        animate={{
                            // rotate: [0, 0, 0, 300, -350, 0, 0, 0],
                            translateY: [0, 10, -10, 0, -10, 0, 10, 0]
                        }}
                        transition={{
                            repeat: Infinity,
                            duration: 4
                        }}
                        className={`${classes.header} text-center fw-bold`}>
                        Welcome to Expenses App! <FontAwesomeIcon icon={faMoneyBillWaveAlt} className={classes.green} />
                    </motion.h1>
                    <br></br>
                </div>

                <div className="container">
                    <AuthForm />
                </div>
            </div>

            <div className={`${classes.smokeBackground} ${classes.main}`}>
                <div className={`container mb-5`}>
                    <div className="container w-50">
                        <h1 className="text-center mb-5">Better Control About Your Expenses, Less Unnecessary Expenses</h1>
                        <h5 className="text-center">Because we like you to have a controlled account. We offered you a easy way to do so.
                            This is Expenses, Expenses App <FontAwesomeIcon icon={faMoneyBillAlt} className={classes.green} /></h5>
                    </div>
                </div>
                <div className={`d-flex flex-row justify-content-center ${classes.widthContainer} mb-3 ${classes.marginTop}`}>
                    <div className="container w-50 d-flex flex-column align-items-center">
                        <motion.div
                            whileHover={{
                                transform: 'translateY(-1em)'
                            }}
                            transition={{
                                duration: 0.2
                            }}
                            className={`${classes.cardWidth} ${classes.whiteGray}`}>
                            <img src="/static/images/Bills.jpg" className={`${classes.imagesThumbnail} shadow`} />
                        </motion.div>
                        <h3 className="text-center fw-bold">Controled Expenses, More Saves</h3>
                    </div>

                    <div className="container w-50 d-flex flex-column align-items-center">
                        <motion.div
                            whileHover={{
                                transform: 'translateY(-1em)'
                            }}
                            transition={{
                                duration: 0.2
                            }}
                            className={`${classes.cardWidth} ${classes.whiteGray}`}>
                            <img src="/static/images/Growing.jpg" className={`${classes.imagesThumbnail} shadow`} />
                        </motion.div>
                        <h3 className="text-center fw-bold">Money can Become A tool to Make More Money</h3>
                    </div>

                    <div
                        className="container w-50 d-flex flex-column align-items-center">
                        <motion.div
                            whileHover={{
                                transform: 'translateY(-1em)'
                            }}
                            transition={{
                                duration: 0.2
                            }}
                            className={`${classes.cardWidth} ${classes.whiteGray}`}>
                            <img src="/static/images/Coins.jpg" className={`${classes.imagesThumbnail} shadow`} />
                        </motion.div>
                        <h3 className="text-center fw-bold">Soon you will have a lot of Money</h3>
                    </div>
                </div>

                <div className={`d-flex flex-row justify-content-center ${classes.widthContainer}`}>
                    <div className="container w-50 d-flex flex-column align-items-center">
                        <div className={`${classes.cardWidth} text-center`}>
                            <h4 className={`${classes.gray}`}>
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer eu luctus orci, ut semper urna. Aenean pellentesque lacus aliquam urna faucibus,
                                eu rutrum lorem placerat.
                            </h4>
                        </div>
                    </div>

                    <div className="container w-50 d-flex flex-column align-items-center">
                        <div className={`${classes.cardWidth} text-center`}>
                            <h4 className={`${classes.gray}`}>
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer eu luctus orci, ut semper urna. Aenean pellentesque lacus aliquam urna faucibus,
                                eu rutrum lorem placerat.
                            </h4>
                        </div>

                    </div>

                    <div className="container w-50 d-flex flex-column align-items-center">
                        <div className={`${classes.cardWidth} text-center`}>
                            <h4 className={`${classes.gray}`}>
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer eu luctus orci, ut semper urna. Aenean pellentesque lacus aliquam urna faucibus,
                                eu rutrum lorem placerat.
                            </h4>
                        </div>
                    </div>
                </div>

                <div className={`d-flex flex-row justify-content-center ${classes.marginTop} paddingB`}>
                    <div className={`d-flex flex-row ${classes.banner}`}>
                        <div className="col">
                            <img src="/static/images/Code.jpg" className={`${classes.codeImage}`} />
                        </div>

                        <div className={`col text-dark ${classes.colInfo}`}>
                            <div className="container w-50">
                                <br></br>
                                <h5 className="text-center">We love what we do</h5>
                                <hr></hr>
                            </div>

                            <div className="container w-50">
                                <p className="text-center">
                                    With our great team, not only we do our task. 
                                    <br></br>
                                    <br></br>
                                    We do our task the best possible.
                                    <br></br>
                                    <br></br>
                                    Because this is not only developers App, it's ours. 
                                </p>
                            </div>

                        </div>
                    </div>
                </div>

            </div>
        </div >
    )
}

export default Home;