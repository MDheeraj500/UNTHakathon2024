import React from 'react';
import { Cell, Legend, Pie, PieChart, ResponsiveContainer, Tooltip } from 'recharts';

const COLORS = ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0'];

const CategoryPieChart = ({ data = [] }) => {
    const chartData = data.length > 0 ? data : [{ category: "Sample", percentage: 100 }];
    
    console.log("Category Pie Chart Data:", chartData); // Log data to check

    return (
        <div className="w-full max-w-2xl p-8 bg-gray-800 bg-opacity-90 rounded-lg shadow-lg">
            <h2 className="text-3xl font-semibold text-center text-orange-500 mb-6">Expense Category Distribution</h2>
            <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                    <Pie
                        data={chartData}
                        dataKey="percentage"   // Ensure dataKey is correct
                        nameKey="category"
                        cx="50%"
                        cy="50%"
                        outerRadius={90}
                        label={({ category, percentage }) => `${category}: ${percentage.toFixed(1)}%`}  // Label with category and percentage
                    >
                        {chartData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                    </Pie>
                    <Tooltip formatter={(value) => `${value.toFixed(2)}%`} contentStyle={{ backgroundColor: '#111827', borderColor: '#374151' }} />
                    <Legend />
                </PieChart>
            </ResponsiveContainer>
        </div>
    );
};

export default CategoryPieChart;
