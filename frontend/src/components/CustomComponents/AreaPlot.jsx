import React from 'react';
import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';

const AreaPlot = ({ data }) => {
    const formattedData = data.reduce((acc, item) => {
        const { month, category, total_amount } = item;
        const existingEntry = acc.find(entry => entry.month === month);
        if (existingEntry) {
            existingEntry[category] = total_amount;
        } else {
            acc.push({ month, [category]: total_amount });
        }
        return acc;
    }, []);

    return (
        <div className="w-full p-8 bg-gray-800 bg-opacity-90 rounded-lg shadow-lg">
            <h2 className="text-3xl font-semibold text-center text-orange-500 mb-6">Monthly Expense Area Chart</h2>
            <ResponsiveContainer width="100%" height={300}>
                <AreaChart data={formattedData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                    <defs>
                        <linearGradient id="colorFood" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#FF6384" stopOpacity={0.8} />
                            <stop offset="95%" stopColor="#FF6384" stopOpacity={0} />
                        </linearGradient>
                        <linearGradient id="colorClothing" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#36A2EB" stopOpacity={0.8} />
                            <stop offset="95%" stopColor="#36A2EB" stopOpacity={0} />
                        </linearGradient>
                        <linearGradient id="colorLogistics" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#FFCE56" stopOpacity={0.8} />
                            <stop offset="95%" stopColor="#FFCE56" stopOpacity={0} />
                        </linearGradient>
                        <linearGradient id="colorMiscellaneous" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#4BC0C0" stopOpacity={0.8} />
                            <stop offset="95%" stopColor="#4BC0C0" stopOpacity={0} />
                        </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="#4B5563" />
                    <XAxis dataKey="month" tick={{ fill: '#FDE68A' }} />
                    <YAxis tick={{ fill: '#FDE68A' }} />
                    <Tooltip contentStyle={{ backgroundColor: '#111827', borderColor: '#374151' }} />
                    <Area type="monotone" dataKey="Food" stroke="#FF6384" fill="url(#colorFood)" />
                    <Area type="monotone" dataKey="Clothing" stroke="#36A2EB" fill="url(#colorClothing)" />
                    <Area type="monotone" dataKey="Logistics" stroke="#FFCE56" fill="url(#colorLogistics)" />
                    <Area type="monotone" dataKey="Miscellaneous" stroke="#4BC0C0" fill="url(#colorMiscellaneous)" />
                </AreaChart>
            </ResponsiveContainer>
        </div>
    );
};

export default AreaPlot;
