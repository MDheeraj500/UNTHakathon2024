import axios from "axios";
import {
    ArcElement,
    Chart as ChartJS,
    Legend,
    Tooltip,
} from "chart.js";
import Cookies from 'js-cookie';
import { useEffect, useState } from "react";
import { Pie } from "react-chartjs-2";
import { Link } from "react-router-dom";
import ghost1 from "../assets/ghost-1.png";
import backgroundImage2 from '../assets/ghost-white.webp';
import backgroundImage from '../assets/green_witch.webp';
import pieBackground from "../assets/orange_pumpkin.webp";
import backgroundImage3 from '../assets/purple-spirit.webp';
import backgroundImage4 from '../assets/yellow-monster.webp';
import CustomLink from "./CustomComponents/CustomLink";
import Navbar from "./navbar";


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
        <div className="min-h-screen bg-zinc-950 flex flex-col relative">
            <Navbar />
            <div className="ghost-1">
                <img src={ghost1} height={500} width={500} />
            </div>
            <div className="ghost-2">
                <img src={ghost1} height={400} width={400} />
            </div>

            <div className="flex flex-grow items-center justify-center">
                <div className="container mx-auto px-4 py-8 flex flex-col items-center">
                    <h1 className="text-9xl font-bold text-orange-300 mb-8 griffy-regular ">Dashboard</h1>

                    <div className=" h-full w-full border-8 border-white rounded-3xl p-8">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                            {/* Pie Chart Container */}
                            <div
                                className="bg-dark-gray rounded-lg p-6 h-[30rem] flex items-center justify-center relative overflow-hidden transition duration-300 ease-in-out group"
                                style={{
                                    backgroundImage: `url(${pieBackground})`, // Specify the background image
                                    backgroundSize: "cover",
                                    backgroundPosition: "center",
                                }}
                            >
                                {/* Background overlay that changes opacity on group hover */}
                                <div className="absolute inset-0 bg-dark-gray opacity-70- group-hover:opacity-70 transition-opacity duration-300 ease-in-out"></div>

                                <div className="w-full h-full relative z-10">
                                    <Pie data={pieChartData} options={pieChartOptions} />
                                </div>
                            </div>


                            {/* Stats Container */}
                            <div className="grid grid-rows-3 gap-4 h-[30rem]">
                                <Link to="/log-analysis">
                                    <CustomLink
                                        backgroundImage={backgroundImage}
                                        overlayColor="bg-orange-500"
                                        title="Personal Expense"
                                        description=""
                                    />
                                </Link>
                                <Link to="/add-expense">
                                    <CustomLink
                                        backgroundImage={backgroundImage2}
                                        overlayColor="bg-purple-500"
                                        title="Add Expense"
                                        description=""
                                    />

                                </Link>
                                <Link to="/retirement-plan"
                                >

                                    <CustomLink
                                        backgroundImage={backgroundImage3}
                                        overlayColor="bg-red-500"
                                        title="Retirement Plan"
                                        description=""
                                    />
                                </Link>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
