import { faMoneyBillAlt, faPencilAlt, faSearchDollar, faSmileBeam, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Chart, registerables } from 'chart.js';
import moment from 'moment';
import Link from 'next/link';
import { ChangeEvent, useEffect, useRef, useState } from 'react';
import { Button, Modal } from 'react-bootstrap';
import Swal from 'sweetalert2';
import Expense from '../../../models/expenseModel';
import classes from './show-expenses.module.scss';

async function getExpensesByYear(year: string) {
    const response = await fetch(`/api/expenses/expensesAPI/expensesAPIYear/${year}`, {
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

async function editExpenseById(expense: Expense) {
    const response = await fetch(`/api/expenses/expensesAPI`, {
        method: 'PUT',
        body: JSON.stringify({
            expenseToUpdate: expense
        }),
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

async function deleteExpenseById(id: string) {
    const response = await fetch(`/api/expenses/expensesAPI`, {
        body: JSON.stringify({
            _id: id
        }),
        method: 'DELETE',
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

async function getChartDataMonthly(year: string) {
    const response = await fetch(`http://localhost:3000/api/expenses/expensesAPI/expensesAPIExpensesByMonth/${year}`, {
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

interface Expense {
    _id: string,
    description: string,
    quantitySpent: number,
    feeling: string,
    date: Date,
    email: string
}

function ShowExpense({ data }: any) {
    const [expenses, setExpenses] = useState(data.year);
    //Chart's data
    const [expensesMonth, setExpensesMonth] = useState(data.month);
    const [year, setYear] = useState(moment(new Date()).format('YYYY'));
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const [selectedExpense, setSelectedExpense] = useState({
        _id: '',
        description: '',
        quantitySpent: 0,
        feeling: '',
        date: new Date() as any,
        email: ''
    });

    const [feeling, setFeeling] = useState([{
        feeling: '',
        feelingImageURL: ''
    }]);

    const getAllExpenses = async (year: string) => {
        let expenses = await getExpensesByYear(year);
        setExpenses(expenses);
        return expenses;
    }

    const handleChangeYear = (event: ChangeEvent<any>) => {
        setYear(event.target.value);
    }

    const searchBy = async () => {
        const data = await getExpensesByYear(year);
        setExpenses(data);

        updateChart(data, year);
        Swal.fire({
            position: 'top-right',
            icon: 'success',
            title: 'Year Changed',
            showConfirmButton: false,
            timer: 800
        });
    }

    const handleOnDelete = async (expense: Expense) => {
        await Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.isConfirmed) {
                deleteExpenseById(expense._id).then(async () => {
                    Swal.fire(
                        'Deleted!',
                        'The element has been deleted.',
                        'success'
                    );
                    const response = await getAllExpenses(year);
                    updateChart(response, year);
                });
            }
        })
    }

    const handleOnEdit = async (expense: Expense) => {
        await editExpenseById(expense).then(() => {
            Swal.fire({
                position: 'center',
                icon: 'success',
                title: 'Expense edited Successfully!',
                showConfirmButton: false,
                timer: 800
            }).then(async result => {
                if (result.isDismissed) {
                    const response = await getAllExpenses(year);
                    setShow(false);
                    updateChart(response, year);
                }
            });
        });
    }

    const handleOnModalOpen = (expense: Expense) => {
        setShow(true);
        setSelectedExpense(expense);
    }

    const handleOnChangeDescription = (event: ChangeEvent<HTMLInputElement>) => {
        setSelectedExpense(prev => ({ ...prev, description: event.target.value }));
    }

    const handleOnChangeFeeling = (value: string) => {
        setSelectedExpense(prev => ({ ...prev, feeling: value }));
    }

    const handleOnChangeDate = (event: ChangeEvent<HTMLInputElement>) => {
        setSelectedExpense(prev => ({ ...prev, date: event.target.value }));
    }

    const handleOnChangeQuantitySpent = (event: ChangeEvent<any>) => {
        setSelectedExpense(prev => ({ ...prev, quantitySpent: event.target.value }));
    }

    const updateChart = async (expensesData: any, year: string) => {
        const response = await getChartDataMonthly(year);

        if (response) {
            setExpensesMonth(response);
        }

        drawChart(response, expensesData);
    }

    const canvasEl: any = useRef(null);

    const colors = {
        purple: {
            default: "rgba(149, 76, 233, 1)",
            half: "rgba(149, 76, 233, 0.5)",
            quarter: "rgba(149, 76, 233, 0.25)",
            zero: "rgba(149, 76, 233, 0)"
        },
        indigo: {
            default: "rgba(80, 102, 120, 1)",
            quarter: "rgba(80, 102, 120, 0.25)"
        }
    };

    const [myLineChart, setMyLineChart]: any = useState(null);
    const drawChart = (response?: any, expensesData?: any) => {
        Chart.register(...registerables);
        const canvas = document.getElementById('myChart') as any;
        let ctx = canvas.getContext('2d');

        let weight = [expensesMonth['01'], expensesMonth['02'], expensesMonth['03'], expensesMonth['04'], expensesMonth['05'], expensesMonth['06'],
        expensesMonth['07'], expensesMonth['08'], expensesMonth['09'], expensesMonth['10'], expensesMonth['11'], expensesMonth['12']];

        if (response) {
            weight = [response['01'], response['02'], response['03'], response['04'], response['05'], response['06'],
            response['07'], response['08'], response['09'], response['10'], response['11'], response['12']];
        }

        const labels = [
            "January",
            "February",
            "March",
            "April",
            "May",
            "June",
            "July",
            "August",
            "September",
            "October",
            "November",
            "December",
        ];
        const data = {
            labels: labels,
            datasets: [
                {
                    backgroundColor: ['#E1E5EA', '#516BEB', '#C64756', '#000', '#CB4335', '#1F618D', '#F1C40F', '#27AE60', '#884EA0', '#D35400', '#C64006', 'pink'],
                    label: "My First Dataset",
                    data: weight,
                    fill: true,
                    borderWidth: 1,
                    lineTension: 0.2,
                    pointBackgroundColor: colors.purple.default,
                    pointRadius: 3
                }
            ]
        };
        const config: any = {
            type: "pie",
            data: data,
            options: {
                responsive: true,
                plugins: {
                    legend: {
                        position: 'bottom',
                    },
                    title: {
                        display: true,
                        text: 'Total Spent Yearly'
                    }
                }
            }
        };

        calculateSummary(weight, expensesData);

        if (!myLineChart) {
            setMyLineChart(new Chart(ctx, config));
        } else {
            myLineChart.destroy();
            setMyLineChart(new Chart(ctx, config));
        }
    }

    const [totalSpentMonth, setTotalSpentMonth] = useState(0);
    const [mostExpensive, setMostExpensive] = useState('');
    const [yearlyTotal, setYearlyTotal] = useState(0);
    const [countObj, setCountObj]: any = useState({});

    const calculateSummary = (weight: number[], expensesData: any) => {
        let total: number = 0;
        for (let i = 0; i < weight.length; i++) {
            total += weight[i];
        }
        setYearlyTotal(total);

        let mostExpensive = {
            description: '',
            quantitySpent: 0,
            feeling: '',
            date: new Date()
        };

        const feelingTimes = [];

        if (!expensesData) {
            for (let i = 0; i < expenses.length; i++) {
                if (mostExpensive.quantitySpent < expenses[i].quantitySpent) {
                    mostExpensive = expenses[i];
                }
                feelingTimes.push(expenses[i].feeling);
            }
        } else {
            for (let i = 0; i < expensesData.length; i++) {
                if (mostExpensive.quantitySpent < expensesData[i].quantitySpent) {
                    mostExpensive = expensesData[i];
                }
                feelingTimes.push(expensesData[i].feeling);
            }
        }

        let counter: any = {};
        let countFunc: any = (keys: string) => {
            counter[keys] = ++counter[keys] || 1;
        }

        feelingTimes.forEach(countFunc);
        setCountObj(counter);

        setMostExpensive('The most expensive expense was [' + mostExpensive.description + '] on ' +
            moment(mostExpensive.date).utcOffset(0).format('MM/DD/YYYY') + ' with a quantity of [$' + mostExpensive.quantitySpent + ']');

        let month: number = moment().month();
        setTotalSpentMonth(weight[month]);
    }

    useEffect(() => {
        setFeeling(data.feeling);
        drawChart();
    }, []);

    return (
        <div className="container container-data">
            <h1 className="text-center">Your Expenses <FontAwesomeIcon icon={faMoneyBillAlt} /></h1>
            <hr></hr>
            <div className="row">
                <div className={`col-sm-6 ${classes.colHeight}`}>
                    <div className={`container ${classes.padd}`}>
                        <div className='row d-flex flex-row justify-content-center'>

                            <div className='col-sm-3 text-center'>
                                <label className='form-label fw-bold'>Year</label>
                                <input className='form-control text-center' onChange={handleChangeYear} type='text' />
                            </div>

                            <div className='col-sm-3 text-center'>
                                <label className='form-label fw-bold'>Search</label>
                                <br></br>
                                <button onClick={searchBy} className='btn btn-light btn-outline-dark'><FontAwesomeIcon icon={faSearchDollar} /></button>
                            </div>

                        </div>

                        <div className={`container ${classes.expensesContainer} mb-3`}>
                            <table className='table table-striped table-hover'>
                                <thead className='table-light'>
                                    <tr className='text-center'>
                                        <th>
                                            Description
                                        </th>
                                        <th>
                                            Feeling
                                        </th>

                                        <th>
                                            Date
                                        </th>

                                        <th>
                                            Quantity Spent
                                        </th>

                                        <th className='w-25'>
                                            Actions
                                        </th>

                                    </tr>
                                </thead>

                                <tbody>
                                    {
                                        expenses.length ?
                                            expenses[0].description ?
                                                expenses.map((e: Expense, index: number) => (
                                                    <tr key={index} className='text-center align-middle'>
                                                        <td> {e.description} </td>
                                                        <td> {e.feeling} </td>
                                                        <td> {e.date ? moment(e.date).utcOffset(0).format('MM/DD/YYYY') : ''} </td>
                                                        <td className='text-end'> {e.quantitySpent} </td>
                                                        <td className=''>
                                                            <div className='d-flex flex-row justify-content-evenly'>
                                                                <button className='btn btn-sm btn-warning btn-outline-dark' onClick={() => handleOnModalOpen(e)}><FontAwesomeIcon icon={faPencilAlt} /></button>
                                                                <button className='btn btn-sm btn-danger btn-outline-dark' onClick={async () => handleOnDelete(e)}><FontAwesomeIcon icon={faTrash} /></button>
                                                            </div>
                                                        </td>
                                                    </tr>
                                                )) :
                                                null
                                            :
                                            <tr className='fw-bold text-center'>
                                                <td colSpan={4}>There is no data!</td>
                                            </tr>
                                    }
                                </tbody>
                            </table>
                        </div>

                        <div className='d-flex flex-row justify-content-center mb-2'>
                            <Link href="/expenses/addExpense"><a className="btn btn-dark btn-sm btn-outline-light">Add New Expense</a></Link>
                        </div>

                    </div>
                </div>

                <div className={`col-sm-6 ${classes.colHeight}`}>
                    <div className={`row ${classes.renglon}`}>
                        <div className='container'>
                            <h5 className='text-center fw-bold'><u>Summary</u></h5>
                            <hr></hr>
                            <div className='mb-3'>
                                <h6><b>Total Spent this month: </b> <u>${totalSpentMonth}</u></h6>
                                <div className='mb-3'>
                                    <h6><b>Feelings Counter <FontAwesomeIcon icon={faSmileBeam} /> </b></h6>
                                    {
                                        Object.entries(countObj).map(([key, value], index) => (
                                            <div className='d-flex flex-row' key={index}>
                                                <div className='col text-center fst-italic'>
                                                    {key}:
                                                </div>

                                                <div className='col'>
                                                    {value} time(s).
                                                </div>
                                            </div>
                                        ))
                                    }
                                </div>
                                <h6><b>Most expensive:</b> <u>{mostExpensive}</u></h6>
                                <h6><b>Your Yearly Total:</b> <u>${yearlyTotal}</u></h6>
                            </div>
                        </div>
                    </div>
                    <div className={`row ${classes.renglon} d-flex flex-row justify-content-center`}>
                        <div className={`${classes.chartDiv}`}>
                            <canvas id="myChart" ref={canvasEl} />
                        </div>
                    </div>
                </div>
            </div>

            <Modal show={show} className={`text-dark`} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Edit Expense</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form className=''>

                        <div className='mb-3'>
                            <label htmlFor='' className='label-form fw-bold'>Description</label>
                            <input type="text" className='form-control' value={selectedExpense.description} onChange={handleOnChangeDescription}></input>
                        </div>

                        <div className='mb-3'>
                            <label htmlFor='' className='label-form fw-bold'>Feeling</label>
                            <select name="feeling" id="feelingId" className="form-select" onChange={e => handleOnChangeFeeling(e.target.value)} value={selectedExpense.feeling}>
                                {
                                    feeling.map((feeling, index) => (
                                        <option key={index} value={feeling.feeling}>{feeling.feeling}</option>
                                    ))
                                }
                            </select>
                        </div>

                        <div className='mb-3'>
                            <label htmlFor='' className='label-form fw-bold'>Date</label>
                            <input type="date" className='form-control' value={selectedExpense.date.toString().split('T')[0]} onChange={handleOnChangeDate}></input>
                        </div>

                        <div className='mb-3'>
                            <label htmlFor='' className='label-form fw-bold'>Quantity Spent</label>
                            <input type="text" className='form-control' value={selectedExpense.quantitySpent} onChange={handleOnChangeQuantitySpent}></input>
                        </div>
                    </form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <button className='btn btn-primary' onClick={async () => handleOnEdit(selectedExpense)}>Save Changes</button>
                </Modal.Footer>
            </Modal>
        </div>
    )
}

export default ShowExpense;