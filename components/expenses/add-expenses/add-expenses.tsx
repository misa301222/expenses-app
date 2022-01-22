import { faMoneyBillAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { motion } from "framer-motion";
import moment from "moment";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { ChangeEvent, useEffect, useState } from "react";
import Swal from "sweetalert2";
import classes from './add-expenses.module.scss';

async function createExpense(expense: any) {
    const response = await fetch('/api/expenses/expensesAPI', {
        method: 'POST',
        body: JSON.stringify(expense),
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

function AddExpenses({ data }: any) {
    const [feeling, setFeeling] = useState([{
        feeling: '',
        feelingImageURL: ''
    }]);
    const [expense, setExpense] = useState({
        description: '',
        quantitySpent: 0,
        feeling: 'Happy',
        date: moment(new Date()).format('YYYY-MM-DD'),
        email: '',
    });

    const handleOnChangeDescription = (event: ChangeEvent<HTMLInputElement>) => {
        setExpense(prev => ({ ...prev, description: event.target.value }));
    }

    const handleOnChangeQuantitySpent = (event: ChangeEvent<any>) => {
        setExpense(prev => ({ ...prev, quantitySpent: event.target.value }));
    }

    const handleOnChangeFeeling = (value: string) => {
        setExpense(prev => ({ ...prev, feeling: value }));
    }

    const handleOnChangeDate = (event: ChangeEvent<any>) => {
        setExpense(prev => ({ ...prev, date: event.target.value }));
    }

    const handleSubmit = (event: any) => {
        event.preventDefault();
        const result = createExpense(expense);
        console.log(result);
        Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Expense Added Successfully!',
            showConfirmButton: false,
            timer: 800
        });
        event.target.reset();
    }

    useEffect(() => {
        setFeeling(data);
        localStorage.getItem('email') ? setExpense(prev => ({ ...prev, email: localStorage.getItem('email') || '{}' })) : '';
    }, [])

    return (
        <div className="container container-data">

            <div className="">
                <h1 className="text-center">New Expense! <FontAwesomeIcon icon={faMoneyBillAlt} /></h1>
                <hr></hr>
            </div>

            <div className={`container d-flex flex-row justify-content-center`}>
                <div className={`${classes.banner} d-flex flex-row`}>
                    <div className='container d-flex flex-column'>
                        <br></br>
                        <motion.h2
                            animate={{
                                translateY: [0, 0, 0, -30, -25, -30, -25, 0, 0, 0],
                                rotate: [0, 0, 0, 0, -10, 10, -10, 0, 0, 0]
                            }}
                            transition={{
                                repeat: Infinity,
                                duration: 4
                            }}
                            className='text-center'>Here you can Add a New Expense</motion.h2>
                        <hr></hr>
                        <p className='fw-bold text-wrap'>Fill the data and then click in Save to add it~!</p>
                        <br></br>
                        <div className='container text-center'>
                            <p className="fst-italic">If you want to see your current expenses click down below :]</p>
                            <div className='d-flex flex-row justify-content-center mb-2'>
                                <Link href="/expenses/showExpense"><a className="btn btn-dark btn-sm btn-outline-light">Show All Expenses</a></Link>
                            </div>
                        </div>
                    </div>
                </div>

                <div>
                    <div className={`card ${classes.cardStyle}`}>
                        <form className="" onSubmit={handleSubmit}>
                            <div className="mb-3">
                                <label htmlFor='description' className='form-label fw-bold'>Description</label>
                                <input type='text' className="form-control" name="description" onChange={handleOnChangeDescription} autoComplete="off" />
                            </div>

                            <div className="mb-3">
                                <label htmlFor='quantitySpent' className='form-label fw-bold'>Quantity Spent <small className="text-danger">(Quantity in Dollars)</small></label>
                                <input type='text' className="form-control" name="quantitySpent" onChange={handleOnChangeQuantitySpent} autoComplete="off" />
                            </div>

                            <div className="mb-3">
                                <label htmlFor='feeling' className='form-label fw-bold'>Feeling</label>
                                <select name="feeling" id="feelingId" className="form-select" onChange={e => handleOnChangeFeeling(e.target.value)}>
                                    {
                                        feeling.map((feeling, index) => (
                                            <option key={index} value={feeling.feeling}>{feeling.feeling}</option>
                                        ))
                                    }
                                </select>
                            </div>

                            <div className="mb-3">
                                <label htmlFor='date' className='form-label fw-bold'>Date</label>
                                <input type='date' value={expense.date} className="form-control" name="date" onChange={handleOnChangeDate} autoComplete="off" />
                            </div>

                            <div className="mb-3 text-center">
                                <button type="submit" className="btn btn-dark btn-outline-light">Save New Expense</button>
                            </div>

                        </form>
                    </div>
                </div>
            </div>
        </div >)
}

export default AddExpenses;