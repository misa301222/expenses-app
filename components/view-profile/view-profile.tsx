import { faBriefcase, faDice, faEnvelope, faGraduationCap, faHeart, faMapMarkerAlt, faMobileAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useEffect } from 'react';
import classes from './view-profile.module.scss';
import { motion } from 'framer-motion';


function ViewProfile({ data }: any) {
    const textMessage = {
        rest: {
            color: "grey",
            opacity: 1
        },
        tapped: {
            color: "green",
            opacity: 0
        }
    }

    useEffect(() => {
        console.log('dataaa---');
        console.log(data);
    }, []);

    return (
        <div className='main'>
            <div className={`${classes.coverImage}`} style={{
                backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), 
            url(${data.profile.coverURL})`
            }}>
            </div>

            <div className={`${classes.profileInfo} d-flex flex-row mb-5`}>
                <div className='col-sm-1'></div>

                <div className='col-sm-3'>
                    <motion.div
                        whileTap={{
                            scale: [1, 1.5, 1.5, 1, 1],
                            rotate: [0, 0, 270, 270, 0],
                            borderRadius: ["0", "20%", "50%", "50%", "0"],
                        }}
                        className={`${classes.square} d-flex flex-col justify-content-center align-items-center shadow-lg mb-3`}>
                        {
                            data.user.imageURL ?
                                <img src={data.user.imageURL} className={`${classes.photo} shadow`} />
                                :
                                <img src='/static/images/Blank.png' className={`${classes.photo} shadow`} />
                        }

                    </motion.div>
                    <div className='container d-flex flex-row justify-content-center'>
                        <div className='row w-75'>
                            <h6><FontAwesomeIcon icon={faMapMarkerAlt} /><b> Location:</b> {data.profile.location}</h6>
                            <h6><FontAwesomeIcon icon={faEnvelope} /><b>  Email:</b> {data.user.email}</h6>
                            <h6><FontAwesomeIcon icon={faMobileAlt} /><b>  Phone:</b> {data.profile.phoneNumber}</h6>
                        </div>
                    </div>
                </div>

                <div className='col-sm-1'></div>

                <div className='col-sm-3'>
                    <div className={`${classes.info} container`}>
                        <motion.div
                            initial={{
                                translateX: 1000
                            }}
                            animate={{
                                translateX: 0
                            }}
                            transition={{
                                duration: 1
                            }}
                            className={`row ${classes.fullNameDesign} shadow-lg mb-5`}>
                            <h1 className={`text-dark ${classes.fontBig}`}>{data.user.fullName}</h1>
                        </motion.div>

                        <motion.div
                            initial={{
                                opacity: 0,
                                scale: 0.1
                            }}
                            whileInView={{
                                opacity: 1,
                                scale: 1
                            }}
                            viewport={{ once: true }}
                            transition={{
                                duration: 1
                            }}
                            className={`row mb-3`}>
                            <h1 className={`text-white`}>{data.profile.descriptionHeader}</h1>
                        </motion.div>

                        <motion.div
                            initial={{
                                opacity: 0,
                                scale: 0.1
                            }}
                            whileInView={{
                                opacity: 1,
                                scale: 1
                            }}
                            viewport={{ once: true }}
                            transition={{
                                duration: 1
                            }}
                            className={`row mb-3`}>
                            <h3 className={`${classes.textGray}`}>{data.profile.description}</h3>
                        </motion.div>
                    </div>
                </div>
            </div>
            <br></br>

            <div className={`d-flex flex-column container`}>
                <div className={`container`}>
                    <motion.div
                        initial={{
                            translateX: 1000
                        }}
                        animate={{
                            translateX: 0
                        }}
                        transition={{
                            duration: 1
                        }}
                        className={`row ${classes.fullNameDesign} shadow-lg mb-5`}>
                        <h1 className={`text-dark ${classes.fontBig}`}>Hobbies And Work Experience</h1>
                    </motion.div>
                    <br></br>

                    <motion.div
                        initial={{
                            opacity: 0,
                            scale: 0.1
                        }}
                        whileInView={{
                            opacity: 1,
                            scale: 1
                        }}
                        viewport={{ once: true }}
                        transition={{
                            duration: 1
                        }}
                        className={`d-flex flex-row justify-content-evenly`}>
                        <div className={`d-flex flex-column ${classes.cardDescription}`}>
                            <motion.div
                                animate={{
                                    rotate: [0, 0, 0, 300, -350, 0, 0, 0],
                                }}
                                transition={{
                                    repeat: Infinity,
                                    duration: 3
                                }}
                                className={`shadow ${classes.rotateRight} card text-center d-flex flex-row justify-content-evenly align-items-center mb-5`}>
                                <FontAwesomeIcon icon={faGraduationCap} className={`${classes.icon}`} />
                                <small className='fw-bold'>Education</small>
                            </motion.div>

                            <ul>
                                {
                                    data.profile.education[0] ?
                                        data.profile.education.map((element: string, index: number) => (
                                            element ?
                                                <li key={index}>{element}</li>
                                                : null
                                        )) : <small className='fw-bold text-muted fst-italic'>No info</small>
                                }
                            </ul>
                        </div>

                        <div className={`d-flex flex-column ${classes.cardDescription}`}>
                            <motion.div
                                animate={{
                                    rotate: [0, 0, 0, 300, -350, 0, 0, 0],
                                }}
                                transition={{
                                    repeat: Infinity,
                                    duration: 3
                                }}
                                className={`shadow ${classes.rotateRight} card text-center d-flex flex-row justify-content-evenly align-items-center mb-5`}>
                                <FontAwesomeIcon icon={faDice} className={`${classes.icon}`} />
                                <small className='fw-bold'>Hobbies</small>
                            </motion.div>

                            <ul>
                                {
                                    data.profile.hobbies[0] ?
                                        data.profile.hobbies.map((element: string, index: number) => (
                                            element ?
                                                <li key={index}>{element}</li>
                                                : null
                                        )) : <small className='fw-bold text-muted fst-italic'>No info</small>
                                }
                            </ul>

                        </div>

                        <div className={`d-flex flex-column ${classes.cardDescription}`}>
                            <motion.div
                                animate={{
                                    rotate: [0, 0, 0, 300, -350, 0, 0, 0],
                                }}
                                transition={{
                                    repeat: Infinity,
                                    duration: 3
                                }}
                                className={`shadow ${classes.rotate} card text-center d-flex flex-row justify-content-evenly align-items-center mb-5`}>
                                <FontAwesomeIcon icon={faBriefcase} className={`${classes.icon}`} />
                                <small className='fw-bold'>Jobs</small>
                            </motion.div>

                            <ul>
                                {
                                    data.profile.jobs[0] ?
                                        data.profile.jobs.map((element: string, index: number) => (
                                            element ?
                                                < li key={index} className={`${classes.textGray}`}>{element}</li>
                                                : null
                                        )) : <small className='fw-bold text-muted fst-italic'>No info</small>
                                }
                            </ul>
                        </div>
                    </motion.div>

                </div>

                <div className={`${classes.containerImages}`}>
                    <motion.div
                        initial={{
                            translateX: 1000
                        }}
                        animate={{
                            translateX: 0
                        }}
                        transition={{
                            duration: 1
                        }}
                        className={`row ${classes.fullNameDesign} shadow-lg mb-5`}>
                        <h1 className={`text-dark ${classes.fontBig}`}>Images I Like</h1>
                    </motion.div>

                    <div className={`container ${classes.imagesILikeContainer}`}>
                        <motion.div
                            initial={{
                                opacity: 0,
                                scale: 0.1
                            }}
                            whileInView={{
                                opacity: 1,
                                scale: 1
                            }}
                            viewport={{ once: true }}
                            transition={{
                                duration: 1
                            }}
                            className={`d-flex flex-wrap`}>
                            {
                                data.profile.imagesURL[0] ?
                                    data.profile.imagesURL.map((element: string, index: number) => (
                                        <motion.div
                                            drag
                                            dragConstraints={{
                                                top: -20,
                                                left: -50,
                                                right: 850,
                                                bottom: 400,
                                            }}
                                            variants={textMessage}
                                            key={index} className={`${classes.imageCard} shadow`} >
                                            <img src={element} className={`${classes.imageThumbnail} shadow`} />
                                            <br></br>
                                            <br></br>
                                            <div className='container text-center'>
                                                <small className='text-dark'><FontAwesomeIcon icon={faHeart} /></small>
                                            </div>
                                        </motion.div>
                                    ))
                                    :
                                    <h5 className='text-danger'>Oops, It seems he doesn't have any favorite pics :( </h5>
                            }
                        </motion.div>
                    </div>
                </div>

                <div className={`${classes.containerImages}`}>
                    <motion.div
                        initial={{
                            translateX: 1000
                        }}
                        animate={{
                            translateX: 0
                        }}
                        transition={{
                            duration: 1
                        }}
                        className={`row ${classes.fullNameDesign} shadow-lg mb-5`}>
                        <h1 className={`text-dark ${classes.fontBig}`}>Financial Info</h1>
                    </motion.div>
                    {
                        !data.user.privateInfo ?
                            <motion.div
                                initial={{
                                    opacity: 0,
                                    scale: 0.1
                                }}
                                whileInView={{
                                    opacity: 1,
                                    scale: 1
                                }}
                                viewport={{ once: true }}
                                transition={{
                                    duration: 1
                                }}
                                className={`container ${classes.textGray}`}>
                                <h4>Most Expensive Item: <u>{data.expenses.mostExpensiveDescription}</u></h4>
                                <h4>Quantity Spent: <u>${data.expenses.mostExpensiveQuantity}</u></h4>
                                <h4>LifeTime Spent: <u>${data.expenses.lifeTimeSpent}</u></h4>
                            </motion.div>
                            :
                            <h5 className='text-danger text-center'>Nothing to see here! </h5>
                    }
                </div>

            </div>

        </div >
    )
}

export default ViewProfile;