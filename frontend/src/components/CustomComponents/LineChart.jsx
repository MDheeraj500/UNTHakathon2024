import React from 'react';
import { CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';

const CustomLineChart = ({ data }) => {
    return (
        <div className="w-full p-8 bg-gray-800 bg-opacity-90 rounded-lg shadow-lg">
            <h2 className="text-3xl font-semibold text-center text-orange-500 mb-6">Expense Trend Over Time</h2>
            <ResponsiveContainer width="100%" height={300}>
                <LineChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#4B5563" />
                    <XAxis dataKey="month" tick={{ fill: '#FDE68A' }} />
                    <YAxis tick={{ fill: '#FDE68A' }} />
                    <Tooltip contentStyle={{ backgroundColor: '#111827', borderColor: '#4B5563' }} />
                    <Line type="monotone" dataKey="total_expense" stroke="rgba(253, 100, 0, 0.8)" strokeWidth={2} />
                </LineChart>
            </ResponsiveContainer>
        </div>
    );
};

export default CustomLineChart;
