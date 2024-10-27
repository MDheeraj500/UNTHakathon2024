import AreaPlot from './CustomComponents/AreaPlot';
import CustomBarChart from './CustomComponents/BarChart';
import HangingSpider from './CustomComponents/HangingSpider';
import CustomLineChart from './CustomComponents/LineChart';
import CategoryPieChart from './CustomComponents/PieChart';
import Navbar from './navbar';

const LogAnalysis = () => {
    return (
        <div className="h-screen w-full font-inter bg-zinc-900 text-white relative overflow-hidden">
            <Navbar />

            <div className="spider-container">
                <img className="fog" src="https://i.imgur.com/HanKgts.gif" />
            </div>
            <HangingSpider />

            {/* Main Content */}
            <div className="flex flex-col gap-5 p-4 px-10 relative z-10">
                <h2 className="font-extrabold text-4xl  griffy-regular  ">Personal Expense Log Analysis</h2>
                <div className="flex flex-row items-center gap-5 w-full">
                    <CustomBarChart />
                    <CustomLineChart />
                </div>
                <div className="flex flex-row items-center gap-5 w-full">

                    <CategoryPieChart />
                    <AreaPlot />
                </div>

                <div className="absolute bottom-0 left-1/2  transform -translate-x-1/2">
                    <button className="poison-button relative w-[16rem] px-4 py-2 bg-neon-orange text-white font-bold rounded shadow-black hover:bg-purple-700 transition duration-150 ease-in-out overflow-hidden">
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
