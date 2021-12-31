import { faSearchDollar } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Chart, registerables } from 'chart.js';
import moment from 'moment';
import { useEffect, useRef, useState } from 'react';
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

interface Expense {
    description: string,
    quantitySpent: number,
    feeling: string,
    date: Date,
    email: string
}

function ShowExpense({ data }: any) {
    const [expenses, setExpenses] = useState(data.year);
    //Chart's data
    const [expensesMonth] = useState(data.month);
    const [year, setYear] = useState('');

    const handleChangeYear = (event: any) => {
        setYear(event.target.value);
    }

    const searchBy = async () => {
        const data = await getExpensesByYear(year);
        setExpenses(data);
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

    useEffect(() => {
        Chart.register(...registerables);
        const ctx = canvasEl.current.getContext("2d");
        const weight = [expensesMonth['01'], expensesMonth['02'], expensesMonth['03'], expensesMonth['04'], expensesMonth['05'], expensesMonth['06'],
        expensesMonth['07'], expensesMonth['08'], expensesMonth['09'], expensesMonth['10'], expensesMonth['11'], expensesMonth['12']];

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
        const myLineChart: any = new Chart(ctx, config);

        return function cleanup() {
            myLineChart.destroy();
        };
    }, []);

    return (
        <div className="container container-data">
            <h1 className="text-center">Your Expenses</h1>
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

                        <div className={`container ${classes.expensesContainer}`}>
                            <table className='table table-bordered'>
                                <thead>
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
                                    </tr>
                                </thead>

                                <tbody>
                                    {
                                        expenses.length ?
                                            expenses[0].description ?
                                                expenses.map((e: Expense, index: number) => (
                                                    <tr key={index} className='text-center'>
                                                        <td> {e.description} </td>
                                                        <td> {e.feeling} </td>
                                                        <td> {e.date ? moment(new Date(e.date.toString())).format('MM/DD/YYYY') : ''} </td>
                                                        <td className='text-end'> {e.quantitySpent} </td>
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

                    </div>
                </div>

                <div className={`col-sm-6 ${classes.colHeight}`}>
                    <div className={`row ${classes.renglon}`}>
                        <div className='container'>
                            <h5 className='text-center'>Summary</h5>
                            <hr></hr>
                            <div className='mb-3'>
                                <h6>Total Spent this month: </h6>
                                <h6>Average Feeling: </h6>
                                <h6>Most expensive: </h6>
                                <h6>Your Yearly Total: </h6>
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
        </div>
    )
}

export default ShowExpense;