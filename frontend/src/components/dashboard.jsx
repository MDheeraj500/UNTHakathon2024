import React, { useEffect, useState } from "react";
import { PieChart, Pie, Cell, Legend, ResponsiveContainer } from "recharts";
import axios from "axios";

const Dashboard = () => {
    const [expenses, setExpenses] = useState({
        fixedExpense: 0,
        saving: 0,
        personalExpense: 0,
    });

    // Dummy data for the pie chart
    const dummyData = {
        fixedExpense: 1200,
        saving: 200,
        personalExpense: 200,
    };

    useEffect(() => {
        // Function to fetch expenses from the API
        const fetchExpenses = async () => {
            try {
                // Replace the URL with your actual API endpoint
                const response = await axios.get("http://localhost:8080/api/expenses");
                // Assuming response.data returns the required structure
                setExpenses(response.data);
            } catch (error) {
                console.error("Error fetching expenses:", error);
                // Use dummy data in case of an error
                setExpenses(dummyData);
            }
        };

        fetchExpenses();
    }, []);

    // Prepare data for the pie chart
    const pieChartData = [
        { name: "Fixed Expense", value: expenses.fixedExpense || dummyData.fixedExpense },
        { name: "Saving", value: expenses.saving || dummyData.saving },
        { name: "Personal Expense", value: expenses.personalExpense || dummyData.personalExpense },
    ];

    // Define colors for the pie chart segments
    const COLORS = ['#0088FE', '#00C49F', '#FFBB28'];

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white p-6">
            <h1 className="text-3xl font-bold mb-6">Dashboard</h1>
            <div className="w-full max-w-md">
                <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                        <Pie
                            data={pieChartData}
                            cx="50%"
                            cy="50%"
                            labelLine={false}
                            outerRadius={80}
                            fill="#8884d8"
                            dataKey="value"
                            isAnimationActive={true} // Enable animations
                            animationDuration={1000} // Duration in milliseconds
                            animationEasing="ease-in-out" // Easing function for animations
                        >
                            {pieChartData.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                            ))}
                        </Pie>

                        <Legend />
                    </PieChart>
                </ResponsiveContainer>
            </div>
            <div className="flex flex-col items-center mt-6 space-y-4">
                <div className="bg-gray-800 p-4 rounded-lg w-full max-w-xs text-center">
                    <h2 className="text-xl font-semibold text-neon-green">Personal Expense</h2>
                    <p className="text-white">{`0 out of ${expenses.personalExpense || dummyData.personalExpense}`}</p>
                </div>
                <div className="bg-gray-800 p-4 rounded-lg w-full max-w-xs text-center">
                    <h2 className="text-xl font-semibold text-neon-green">Savings</h2>
                    <p className="text-white">{`0 out of ${expenses.saving || dummyData.saving}`}</p>
                </div>
                <div className="bg-gray-800 p-4 rounded-lg w-full max-w-xs text-center">
                    <h2 className="text-xl font-semibold text-neon-green">Financial Literacy</h2>
                    <p className="text-white">{`0 out of 200`}</p>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
