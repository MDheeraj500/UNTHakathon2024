import React from 'react';
import { ScatterChart, Scatter, CartesianGrid, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

const Histogram = () => {
    // Dummy data for weekly expenses
    const data = [
        { day: 'Monday', expenses: 120 },
        { day: 'Tuesday', expenses: 90 },
        { day: 'Wednesday', expenses: 150 },
        { day: 'Thursday', expenses: 80 },
        { day: 'Friday', expenses: 200 },
        { day: 'Saturday', expenses: 50 },
        { day: 'Sunday', expenses: 70 },
    ];

    return (
        <div className="w-full max-w-2xl p-8 bg-gray-800 bg-opacity-90 rounded-lg shadow-lg">
            <h2 className="text-3xl font-semibold text-center text-orange-500 mb-6">Weekly Expense Scatter Plot</h2>
            <ResponsiveContainer width="100%" height={300}>
                <ScatterChart margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#4B5563" />
                    <XAxis
                        type="category"
                        dataKey="day"
                        tick={{ fill: '#FDE68A' }}
                        name="Day"
                    />
                    <YAxis
                        type="number"
                        dataKey="expenses"
                        tick={{ fill: '#FDE68A' }}
                        name="Expenses ($)"
                    />
                    <Tooltip
                        cursor={{ stroke: 'rgba(253, 100, 0, 0.2)', strokeWidth: 2 }}
                        contentStyle={{ backgroundColor: '#111827', borderColor: '#4B5563' }}
                        labelStyle={{ color: '#FDE68A' }}
                        itemStyle={{ color: '#FCD34D' }}
                    />
                    <Scatter
                        name="Expenses"
                        data={data}
                        fill="rgba(253, 100, 0, 0.8)" // Halloween-themed orange
                        shape="circle"
                    />
                </ScatterChart>
            </ResponsiveContainer>
        </div>
    );
};

export default Histogram;
