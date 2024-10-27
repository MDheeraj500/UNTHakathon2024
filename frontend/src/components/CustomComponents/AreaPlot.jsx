import React from 'react';
import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';

const data = [
    { month: 'Jan', ClassroomSupplies: 400, Books: 240, Technology: 200 },
    { month: 'Feb', ClassroomSupplies: 300, Books: 139, Technology: 221 },
    { month: 'Mar', ClassroomSupplies: 200, Books: 980, Technology: 229 },
    { month: 'Apr', ClassroomSupplies: 278, Books: 390, Technology: 200 },
    { month: 'May', ClassroomSupplies: 189, Books: 480, Technology: 218 },
    { month: 'Jun', ClassroomSupplies: 239, Books: 380, Technology: 250 },
    { month: 'Jul', ClassroomSupplies: 349, Books: 430, Technology: 210 },
];

const AreaPlot = () => {
    return (
        <div className="w-full  p-8 bg-gray-800 bg-opacity-90 rounded-lg shadow-lg">
            <h2 className="text-3xl font-semibold text-center text-orange-500 mb-6">Monthly Expense Area Chart</h2>
            <ResponsiveContainer width="100%" height={300}>
                <AreaChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                    {/* Gradient for areas */}
                    <defs>
                        <linearGradient id="colorClassroomSupplies" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#FF6384" stopOpacity={0.8} />
                            <stop offset="95%" stopColor="#FF6384" stopOpacity={0} />
                        </linearGradient>
                        <linearGradient id="colorBooks" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#36A2EB" stopOpacity={0.8} />
                            <stop offset="95%" stopColor="#36A2EB" stopOpacity={0} />
                        </linearGradient>
                        <linearGradient id="colorTechnology" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#FFCE56" stopOpacity={0.8} />
                            <stop offset="95%" stopColor="#FFCE56" stopOpacity={0} />
                        </linearGradient>
                    </defs>

                    {/* Grid and Axes */}
                    <CartesianGrid strokeDasharray="3 3" stroke="#4B5563" />
                    <XAxis dataKey="month" tick={{ fill: '#FDE68A' }} />
                    <YAxis tick={{ fill: '#FDE68A' }} />

                    {/* Tooltip */}
                    <Tooltip
                        contentStyle={{ backgroundColor: '#111827', borderColor: '#374151' }}
                        labelStyle={{ color: '#FDE68A' }}
                        itemStyle={{ color: '#FCD34D' }}
                    />

                    {/* Area Layers */}
                    <Area
                        type="monotone"
                        dataKey="ClassroomSupplies"
                        stroke="#FF6384"
                        fillOpacity={1}
                        fill="url(#colorClassroomSupplies)"
                    />
                    <Area
                        type="monotone"
                        dataKey="Books"
                        stroke="#36A2EB"
                        fillOpacity={1}
                        fill="url(#colorBooks)"
                    />
                    <Area
                        type="monotone"
                        dataKey="Technology"
                        stroke="#FFCE56"
                        fillOpacity={1}
                        fill="url(#colorTechnology)"
                    />
                </AreaChart>
            </ResponsiveContainer>
        </div>
    );
};

export default AreaPlot;
