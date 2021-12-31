import { Chart, registerables } from "chart.js";
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
    const [expenses, setExpenses] = useState(data);

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

    const handleOnClickAddExpense = () => {
        route.replace('/expenses/addExpense');
    }

    const handleOnClickShowExpense = () => {
        route.replace('/expenses/showExpense');
    };

    useEffect(() => {
        Chart.register(...registerables);
        const ctx = canvasEl.current.getContext("2d");
        const weight = [80, 60.2, 59.1, 50];

        const labels = [
            "Week 1",
            "Week 2",
            "Week 3",
            "Week 4",
        ];
        const data = {
            labels: labels,
            datasets: [
                {
                    backgroundColor: ['#E1E5EA', '#516BEB', '#C64756', '#000'],
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
            type: "doughnut",
            data: data,
            options: {
                responsive: true,
                plugins: {
                    legend: {
                        position: 'top',
                    },
                    title: {
                        display: true,
                        text: 'Total Spent by Week of the Month'
                    }
                }
            }
        };
        const myLineChart: any = new Chart(ctx, config);

        return function cleanup() {
            myLineChart.destroy();
        };
    });

    return (
        <div className="container container-data">
            <h1 className="text-center fw-bold">Welcome to expenses!</h1>
            <br></br>
            <div className="row">
                <div className={`col-sm-6 ${classes.colHeight}`}>
                    Data from expenses or smth
                    <canvas id="myChart" ref={canvasEl} height="100" />
                </div>

                <div className={`col-sm-6 ${classes.colHeight}`}>
                    <div className={`row ${classes.renglon}`}>
                        upright
                    </div>
                    <div className={`row ${classes.renglon}`}>
                        <div className="container">
                            <h5 className="text-center">Useful Links</h5>
                            <hr></hr>
                            <div className="list-group">
                                <Link href="/expenses/addExpense"><a className="list-group-item list-group-item-action">Add New Expense</a></Link>
                                <Link href="/expenses/showExpense"><a className="list-group-item list-group-item-action">Show All Expenses</a></Link>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    )
}

export default ExpensesHome;