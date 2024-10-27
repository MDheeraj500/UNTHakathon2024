import React from 'react';
import { CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';

const CustomLineChart = () => {
    // Dummy data for line chart (random values)
    const lineChartData = [
        { month: 'Jan', value: 250 },
        { month: 'Feb', value: 400 },
        { month: 'Mar', value: 320 },
        { month: 'Apr', value: 500 },
        { month: 'May', value: 450 },
    ];

    return (
        <div className="w-full p-8 bg-gray-800 bg-opacity-90 rounded-lg shadow-lg">
            <h2 className="text-3xl font-semibold text-center text-orange-500 mb-6">Expense Trend Over Time</h2>
            <ResponsiveContainer width="100%" height={300}>
                <LineChart data={lineChartData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#4B5563" />
                    <XAxis dataKey="month" tick={{ fill: '#FDE68A' }} />
                    <YAxis tick={{ fill: '#FDE68A' }} />
                    <Tooltip
                        cursor={{ stroke: 'rgba(253, 100, 0, 0.2)', strokeWidth: 2 }}
                        contentStyle={{ backgroundColor: '#111827', borderColor: '#4B5563' }}
                        labelStyle={{ color: '#FDE68A' }}
                        itemStyle={{ color: '#FCD34D' }}
                    />
                    <Line
                        type="monotone"
                        dataKey="value"
                        stroke="rgba(253, 100, 0, 0.8)" // Halloween-themed orange
                        strokeWidth={2}
                        dot={{ fill: '#FF7518', r: 5 }} // Darker orange for points
                        activeDot={{ r: 8 }}
                    />
                </LineChart>
            </ResponsiveContainer>
        </div>
    )
}

export default CustomLineChart
