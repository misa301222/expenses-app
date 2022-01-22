import { Chart, registerables } from "chart.js";
import { motion } from "framer-motion";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import classes from './expenses-home.module.scss';

interface Expense {
    description: string,
    quantitySpent: number,
    feeling: string,
    date: Date,
    email: string
}

function ExpensesHome({ data }: any) {
    const route = useRouter();
    const [expensesMonth, setExpensesMonth] = useState(data);

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
    const drawChart = () => {
        Chart.register(...registerables);
        const canvas = document.getElementById('myChart') as any;
        let ctx = canvas.getContext('2d');

        let weight = [expensesMonth['01'], expensesMonth['02'], expensesMonth['03'], expensesMonth['04'], expensesMonth['05'], expensesMonth['06'],
        expensesMonth['07'], expensesMonth['08'], expensesMonth['09'], expensesMonth['10'], expensesMonth['11'], expensesMonth['12']];

        // if (response) {
        //     weight = [response['01'], response['02'], response['03'], response['04'], response['05'], response['06'],
        //     response['07'], response['08'], response['09'], response['10'], response['11'], response['12']];
        // }

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

        if (!myLineChart) {
            setMyLineChart(new Chart(ctx, config));
        } else {
            myLineChart.destroy();
            setMyLineChart(new Chart(ctx, config));
        }
    }

    useEffect(() => {
        console.log(data);
        drawChart();
    }, []);

    return (
        <div className="container container-data">
            <motion.h1
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
                className="text-center fw-bold">Welcome to expenses!</motion.h1>
            <br></br>
            <div                
                className="row">
                <div className={`col-sm-6 ${classes.colHeight}`}>
                    <div className="shadow">
                        <div className={`row ${classes.renglon}`}>
                            <canvas id="myChart" ref={canvasEl} />
                            <div className={`${classes.containerImportant}`}>
                                <h6 className="fw-bold"><u>Important</u></h6>
                                <small className="fw-bold text-muted">If you want to see more detailed information about your expenses. Go to 'Show All Expenses' at the right.</small>
                            </div>
                        </div>
                    </div>
                </div>

                <div className={`col-sm-6 ${classes.colHeight}`}>
                    <div className="shadow">
                        <div className={`row ${classes.renglon}`}>
                            <div className="container">
                                <h4 className="text-center">Useful Links</h4>
                                <hr></hr>
                                <label className="form-label fw-bold"><u>Expenses</u></label>
                                <div className="list-group">
                                    <Link href="/expenses/addExpense"><a className="list-group-item list-group-item-action">Add New Expense</a></Link>
                                    <Link href="/expenses/showExpense"><a className="list-group-item list-group-item-action">Show All Expenses</a></Link>
                                </div>
                                <br></br>
                                <label className="form-label fw-bold"><u>Profile</u></label>
                                <div className="list-group">
                                    <Link href="/profile"><a className="list-group-item list-group-item-action">Edit profile info</a></Link>
                                </div>

                                <br></br>
                                <label className="form-label fw-bold"><u>Social</u></label>
                                <div className="list-group">
                                    <Link href="/viewUsers/viewUsers"><a className="list-group-item list-group-item-action">Users</a></Link>
                                    <Link href="/messages/viewMessages"><a className="list-group-item list-group-item-action">Messages</a></Link>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ExpensesHome;