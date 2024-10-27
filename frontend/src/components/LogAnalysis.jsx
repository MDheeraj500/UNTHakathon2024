import React, { useCallback, useEffect, useState } from 'react';
import axios from 'axios';
import AreaPlot from './CustomComponents/AreaPlot';
import CustomBarChart from './CustomComponents/BarChart';
import HangingSpider from './CustomComponents/HangingSpider';
import CustomLineChart from './CustomComponents/LineChart';
import CategoryPieChart from './CustomComponents/PieChart';
import Navbar from './navbar';

const LogAnalysis = () => {
    const [dashboardData, setDashboardData] = useState({
        all_categories: [],
        expense_trend: [],
        category_distribution: [],
        monthly_expense_area: [],
    });

    // Fetch data for log analysis
    const fetchLogAnalysisData = useCallback(async () => {
        try {
            const response = await axios.get("http://127.0.0.1:5000/LogAnalysis");
            const res = response.data;
            setDashboardData(res);  // Use direct set without async/await
            console.log("Fetched Data:", res);  // Log only fetched data
        } catch (error) {
            console.error("Error fetching log analysis data:", error);
        }
    }, []);

    useEffect(() => {
        fetchLogAnalysisData();  // Call only once
    }, [fetchLogAnalysisData]);

    useEffect(() => {
        console.log("Updated Dashboard Data:", dashboardData);  // Logs on each state change
    }, [dashboardData]);

    return (
        <div className="h-screen w-full font-inter bg-zinc-900 text-white relative overflow-hidden">
            <Navbar />

            <div className="spider-container">
                <img className="fog" src="https://i.imgur.com/HanKgts.gif" alt="fog" />
            </div>
            <HangingSpider />

            {/* Main Content */}
            <div className="flex flex-col gap-5 p-4 px-10 relative">
                <h2 className="font-extrabold text-3xl  griffy-regular">Personal Expense Log Analysis</h2>
                
                <div className="flex flex-row items-center gap-5 w-full">
                    <CustomBarChart data={dashboardData.all_categories} />
                    <CustomLineChart data={dashboardData.expense_trend} />
                </div>

                <div className="flex flex-row items-center gap-5 w-full">
                     {/* <CategoryPieChart data={dashboardData.category_distribution} />  */}
                    <AreaPlot data={dashboardData.monthly_expense_area} />
                </div>

                <div className="z-[150] absolute bottom-0 left-1/2 transform -translate-x-1/2">
                    <button className="poison-button relative w-[16rem] px-4 py-4 bg-neon-orange text-white font-bold rounded shadow-black hover:bg-purple-700 hover:shadow-[0_0_100px_white] transition duration-150 ease-in-out overflow-hidden">
                        <span className="relative z-10">Learn More</span>
                        <div className="bubble"></div>
                        <div className="bubble"></div>
                        <div className="bubble"></div>
                        <div className="bubble"></div>
                        <div className="bubble"></div>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default LogAnalysis;