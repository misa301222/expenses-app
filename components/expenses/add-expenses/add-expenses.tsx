import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
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

function AddExpenses() {
    const [todayDate] = useState(new Date());
    const [expense, setExpense] = useState({
        description: '',
        quantitySpent: 0,
        feeling: 'OK',
        date: new Date(),
        email: '',
    });

    const handleOnChangeDescription = (event: any) => {
        setExpense(prev => ({ ...prev, description: event.target.value }));
    }

    const handleOnChangeQuantitySpent = (event: any) => {
        setExpense(prev => ({ ...prev, quantitySpent: event.target.value }));
    }

    const handleOnChangeFeeling = (event: any) => {
        setExpense(prev => ({ ...prev, feeling: event.target.value }));
    }

    const handleOnChangeDate = (event: any) => {
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
        localStorage.getItem('email') ? setExpense(prev => ({ ...prev, email: localStorage.getItem('email') || '{}' })) : '';
        // console.log(todayDate.toLocaleDateString().split('/')[2] + '/' + todayDate.toLocaleDateString().split('/')[0] + '/' + todayDate.toLocaleDateString().split('/')[1]);
    }, [])

    return (
        <div className="container container-data">

            <div className="">
                <h1 className="text-center">New Expense!</h1>
                <hr></hr>
            </div>

            <div className={`container d-flex flex-row justify-content-center`}>
                <div className={`${classes.banner} d-flex flex-row`}>
                    <div className='container d-flex flex-column'>
                        <br></br>
                        <h2 className='text-center'>Here you can Add a New Expense</h2>
                        <hr></hr>
                        <p className='fw-bold text-wrap'>Fill the data and then click in Save to add it~!</p>
                        <br></br>
                        <div className='container text-center'>

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
                                <input type='text' className="form-control" name="feeling" onChange={handleOnChangeFeeling} value={'OK'} autoComplete="off" />
                            </div>

                            <div className="mb-3">
                                <label htmlFor='date' className='form-label fw-bold'>Date</label>
                                <input type='date' className="form-control" name="date" onChange={handleOnChangeDate} autoComplete="off" />
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