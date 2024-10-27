import React from 'react';
import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';

const CustomBarChart = () => {
    // Dummy data for top 5 expense categories (Bar Chart)
    const barChartData = [
        { category: 'Classroom Supplies', amount: 300 },
        { category: 'Books', amount: 150 },
        { category: 'Technology', amount: 500 },
        { category: 'Decorations', amount: 200 },
        { category: 'Professional Development', amount: 400 },
    ];
    return (
        <div className="w-full max-w-2xl p-8 bg-gray-800 bg-opacity-90 rounded-lg shadow-lg">
            <h2 className="text-3xl font-semibold text-center text-orange-500 mb-6">All Categories</h2>
            <ResponsiveContainer width="100%" height={300}>
                <BarChart data={barChartData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#4B5563" />
                    <XAxis dataKey="category" tick={{ fill: '#FDE68A' }} />
                    <YAxis tick={{ fill: '#FDE68A' }} />
                    <Tooltip
                        cursor={{ fill: 'rgba(253, 100, 0, 0.2)' }}
                        contentStyle={{ backgroundColor: '#111827', borderColor: '#4B5563' }}
                        labelStyle={{ color: '#FDE68A' }}
                        itemStyle={{ color: '#FCD34D' }}
                    />
                    <Bar
                        dataKey="amount"
                        fill="rgba(253, 100, 0, 0.8)"  // Halloween-themed orange
                        barSize={40}
                        radius={[10, 10, 0, 0]}
                    />
                </BarChart>
            </ResponsiveContainer>
        </div>
    )
}

export default CustomBarChart
