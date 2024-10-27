import React from 'react';
import { Cell, Legend, Pie, PieChart, ResponsiveContainer, Tooltip } from 'recharts';

const data = [
    { name: 'Classroom Supplies', value: 300 },
    { name: 'Books', value: 150 },
    { name: 'Technology', value: 500 },
    { name: 'Decorations', value: 200 },
    { name: 'Professional Development', value: 400 },
];

const COLORS = ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF'];

const CategoryPieChart = () => {
    return (

        <div className="w-full max-w-2xl p-8 bg-gray-800 bg-opacity-90 rounded-lg shadow-lg">
            <h2 className="text-3xl font-semibold text-center text-orange-500 mb-6">Expense Category Distribution</h2>
            <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                    <Pie
                        data={data}
                        dataKey="value"
                        nameKey="name"
                        cx="50%"
                        cy="50%"
                        outerRadius={90}
                        fill="#8884d8"
                        label
                    >
                        {data.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                    </Pie>
                    <Tooltip
                        contentStyle={{ backgroundColor: '#111827', borderColor: '#374151' }}
                        labelStyle={{ color: '#F9FAFB' }}
                        itemStyle={{ color: '#D1D5DB' }}
                    />
                    <Legend />
                </PieChart>
            </ResponsiveContainer>
        </div>

    );
};

export default CategoryPieChart;
