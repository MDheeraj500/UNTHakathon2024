import React, { useEffect, useState } from "react";
import { Pie } from "react-chartjs-2";
import Cookies from 'js-cookie';
import {
    Chart as ChartJS,
    ArcElement,
    Tooltip,
    Legend,
} from "chart.js";
import axios from "axios";
import Navbar from "./navbar";
import { Link } from "react-router-dom";

ChartJS.register(ArcElement, Tooltip, Legend);

const Dashboard = () => {
    const [expenses, setExpenses] = useState({
        fixedExpense: 0,
        saving: 0,
        personalExpense: 0,
    });

    const dummyData = {
        fixedExpense: 1200,
        saving: 200,
        personalExpense: 200,
    };

    useEffect(() => {
        const fetchExpenses = async () => {
            try {
                // Get user_id from cookies
                const user_id = Cookies.get("user_id");
                if (!user_id) {
                    console.error("User ID not found in cookies");
                    setExpenses(dummyData);
                    return;
                }

                // Make request to the dashboard endpoint with user_id
                const response = await axios.get(`http://127.0.0.1:5000/dashboard/${user_id}`);
                console.log("Response data:", response.data);
                setExpenses(response.data);
            } catch (error) {
                console.error("Error fetching expenses:", error);
                setExpenses(dummyData);
            }
        };

        fetchExpenses();
    }, []);

    const pieChartData = {
        labels: ["Fixed Expense", "Saving", "Personal Expense", "Retirement Savings"],
        datasets: [
            {
                data: [
                    expenses.fixed_expenses || dummyData.fixedExpense,
                    expenses.current_savings || dummyData.saving,
                    expenses.personal_expenses || dummyData.personalExpense,
                    expenses.retirement_savings || 0,
                ],
                backgroundColor: [
                    'rgba(255, 187, 40, 0.6)',   // Fixed Expense
                    'rgba(128, 0, 128, 0.6)',   // Saving
                    'rgba(255, 165, 0, 0.6)',   // Personal Expense
                    'rgba(60, 179, 113, 0.6)',  // Retirement Savings (new color)
                ],
                borderColor: [
                    '#FFBB28', // Fixed Expense
                    '#800080', // Saving
                    '#FFA500', // Personal Expense
                    '#3CB371', // Retirement Savings (new color)
                ],
                borderWidth: 1,
            },
        ],
    };

    const pieChartOptions = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                position: "bottom",
                labels: {
                    color: "white",
                    font: {
                        size: 16,
                    },
                },
            },
        },
    };

    return (
        <div className="min-h-screen bg-black flex flex-col">
            <Navbar />

            <div className="flex flex-grow items-center justify-center">
                <div className="container mx-auto px-4 py-8 flex flex-col items-center">
                    <h1 className="text-5xl font-bold text-orange-300 mb-8 ">Dashboard</h1>

                    <div className=" h-full w-full border-8 border-white rounded-3xl p-8">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                            {/* Pie Chart Container */}
                            <div className="bg-dark-gray rounded-lg p-6 h-[30rem] flex items-center justify-center">
                                <div className="w-full h-full">
                                    <Pie data={pieChartData} options={pieChartOptions} />
                                </div>
                            </div>

                            {/* Stats Container */}
                            <div className="grid grid-rows-3 gap-4 h-[30rem]">

                                <Link to="/log-analysis" className="bg-witch-green rounded-lg p-6 flex flex-col items-center justify-center">
                                    <h2 className="text-xl font-semibold text-orange-300">Personal Expense</h2>
                                    <p className="text-white">0 out of ${expenses.personalExpense || dummyData.personalExpense}</p>
                                </Link>

                                <Link to="/add-expense" className="bg-spooky-orange rounded-lg p-6 flex flex-col items-center justify-center">
                                    <h2 className="text-xl font-semibold text-orange-300">Add Expense</h2>
                                    <p className="text-white">Add Expense</p>
                                </Link>

                                <div className="bg-deep-gray rounded-lg p-6 flex flex-col items-center justify-center">
                                    <h2 className="text-xl font-semibold text-orange-300">Savings</h2>
                                    <p className="text-white">0 out of ${expenses.saving || dummyData.saving}</p>
                                </div>

                                <div className="bg-monster-yellow rounded-lg p-6 flex flex-col items-center justify-center">
                                    <h2 className="text-xl font-semibold text-orange-300">Financial Literacy</h2>
                                    <p className="text-white">0 out of 200</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
