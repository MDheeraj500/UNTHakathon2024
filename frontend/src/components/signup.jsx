import { useState } from "react";
import { useNavigate } from "react-router";
import axios from "axios";

const Signup = () => {
    const navigate = useNavigate();
    const [fullname, setFullName] = useState("");
    const [age, setAge] = useState("");
    const [occupation, setOccupation] = useState("teacher");
    const [monthlyIncome, setMonthlyIncome] = useState("");
    const [fixedExpense, setFixedExpense] = useState("");
    const [personalExpenseTarget, setPersonalExpenseTarget] = useState("");
    const [monthlySavingGoal, setMonthlySavingGoal] = useState("");
    const [retirementAgeGoal, setRetirementAgeGoal] = useState("");
    const [trsChecked, setTrsChecked] = useState(false);
    const [b403Checked, setB403Checked] = useState(false);
    const [traChecked, setTraChecked] = useState(false);
    const [trsAmount, setTrsAmount] = useState("");
    const [b403Amount, setB403Amount] = useState("");
    const [traAmount, setTraAmount] = useState("");
    const [popup, setPopup] = useState(false);

    const dataSubmittedForSignup = async () => {
        if (!fullname) {
            alert("Please enter your full name.");
        } else if (!age) {
            alert("Please enter your age.");
        } else if (!monthlyIncome) {
            alert("Please enter your monthly income.");
        } else if (!fixedExpense) {
            alert("Please enter your fixed expenses.");
        } else if (!personalExpenseTarget) {
            alert("Please enter your personal expense target.");
        } else if (!monthlySavingGoal) {
            alert("Please enter your monthly saving goals.");
        } else if (!retirementAgeGoal) {
            alert("Please enter your retirement age goal.");
        } else {
            const response = await axios.post("http://localhost:8080/api/signup", {
                fullname,
                age,
                occupation,
                monthlyIncome,
                fixedExpense,
                personalExpenseTarget,
                monthlySavingGoal,
                trsAmount: trsChecked ? trsAmount : 0,
                b403Amount: b403Checked ? b403Amount : 0,
                traAmount: traChecked ? traAmount : 0,
                retirementAgeGoal,
            });

            if (response.status === 200) {
                setPopup(true);
            } else {
                alert(`Error: ${response.data}`);
            }
        }
    };

    const NavigateToLogin = () => {
        navigate("/login");
    };

    return (
        <div className="h-screen w-full flex items-center justify-center relative font-inter bg-signup-background bg-cover bg-center">
            <div className="absolute inset-0 bg-black opacity-70"></div>
            <div className="relative z-10 rounded-xl shadow-[0_0_20px_10px_rgba(0,0,0,0.8)] shadow-black w-full max-w-lg bg-dark-gray bg-opacity-80 overflow-hidden">
                <svg xmlns="http://www.w3.org/2000/svg" width="200" height="200" viewBox="0 0 400 400" className="absolute">
                    <path className="web opacity-25" fill="none" stroke="#979797" d="M0,-5.68434189e-14 L400,121.306344 L0,-5.68434189e-14 L400,285.26053 L0,-5.68434189e-14 L227.648438,393.011063 L0,-5.68434189e-14 C1.47046727e-13,17.8535169 2.25196019e-13,25.2141586 2.34447878e-13,22.0819253 C-2.77555756e-15,14.1807654 8.41705907,14.1807654 11.640625,19.7157991 C8.28763081,14.1807654 15.0848911,10.5067251 19.8417969,14.1807654 C14.945707,10.8607743 23.4522008,7.0949205 28.0325521,8.50884303 C23.6102464,7.06995139 28.0325521,5.49661259e-14 31.5846354,9.29745535e-14 C38.4281568,5.49661259e-14 48.5195313,1.29789891e-13 54.4309896,5.49661259e-14 C46.5294557,4.8813185 46.5294557,8.50884303 48.5195313,14.1807654 C41.2105393,16.9519563 36.6946615,21.3136859 36.6946615,26.7802753 C28.0325521,23.9497513 22.1319025,23.9497513 18.8763021,33.1155318 C11.640625,30.7950863 3.78385417,30.7950863 2.34447878e-13,38.0384047 C2.2057009e-13,43.821629 2.2057009e-13,59.215202 2.34447878e-13,64.1860499 C7.4343148,56.7320168 25.1874502,54.4555577 34.4010417,59.215202 C36.6946615,48.5065074 53.7838542,41.5162712 61.3177083,43.821629 C61.3177083,33.9969921 68.2590957,23.9497513 79.1119792,23.9497513 C73.6378482,16.671534 77.3216758,4.8813185 83.8352865,-2.03689637e-14 C90.7457934,1.24335767e-13 112.134766,1.29108126e-13 119.268229,-2.03689637e-14 C108.727867,4.8813185 105.728516,27.8357249 112.134766,33.9969921 C97.8988189,35.8004323 85.2695313,40.5574112 85.2695313,60.9512567 C71.4511719,64.1860499 55.4628906,70.0888918 49.6686198,85.5867304 C31.5846354,79.6449067 7.1953125,86.916597 3.71057352e-13,97.3367633 C5.22238502e-13,107.998724 2.2057009e-13,129.283495 4.88498131e-13,136.360254 C8.22909541,116.886012 63.0292969,112.004315 71.4511719,123.825351 C71.4511719,97.3367633 109.494031,83.7641694 132.746094,94.1614591 C119.268229,76.5474568 143.167493,47.3233558 166.335286,50.4428164 C149.11599,33.9969921 156.222187,8.50884303 180.297145,9.97922086e-14 C205.828125,8.61568983e-14 227.648438,-2.03689637e-14 242.993758,1.05587216e-13 C219.701873,14.1807654 212.533298,45.331624 233.265175,70.6457839 C198.588806,79.5347866 194.428319,119.622371 199.141641,141.995972 C166.335286,139.080349 115.655857,167.385074 112.134766,196.505531 C83.8352865,174.387949 11.0260417,192.607919 0,213.056775 C5.6673416e-13,235.770982 0,276.619163 1.47885176e-13,296.257687 C19.8417969,264.374056 138.786022,256.312929 156.189667,270.093903 C151.31562,231.430198 250.553612,178.478312 270.46507,192.09809 C253.214038,169.143156 275.925719,90.5672912 298.183531,90.5672912 C273.481594,64.1860499 287.900813,4.8813185 314.979288,-5.68434189e-14 C331.131155,1.28767243e-13 392.408609,9.22225724e-14 400,-5.68434189e-14 C366.203125,11.0387592 367.959025,104.10567 400,121.306344 C357.488994,136.360254 375.213512,258.948717 400,285.26053 C351.686185,275.946918 227.648438,374.936648 227.648438,393.011063 C185.794269,373.603023 15.6760986,362.422132 0,400" />
                </svg>
                <div className="p-8">
                    {popup ? (
                        <div className="text-center">
                            <h2 className="text-2xl font-bold mb-4 text-purple">Signup Completed!</h2>
                            <button
                                className="poison-button relative w-[16rem] px-4 py-2 bg-neon-orange text-white font-bold rounded shadow-black hover:bg-purple-700 transition duration-150 ease-in-out overflow-hidden"
                                onClick={NavigateToLogin}
                            >
                                <span className="relative z-10">Log in</span>
                                <div className="bubble"></div>
                                <div className="bubble"></div>
                                <div className="bubble"></div>
                                <div className="bubble"></div>
                                <div className="bubble"></div>
                            </button>
                        </div>
                    ) : (
                        <div>
                            <h2 className="text-[3rem] font-bold text-center text-purple mb-6">Sign up</h2>
                            <div className="space-y-4">
                                <div className="flex flex-col">
                                    <label className="text-ghost-white text-lg font-medium">Full Name</label>
                                    <input
                                        className="w-full px-3 py-2 mt-2 text-gray-200 bg-dark-gray bg-opacity-70 rounded focus:outline-none focus:ring-2 focus:ring-neon-orange"
                                        type="text"
                                        value={fullname}
                                        onChange={(e) => setFullName(e.target.value)}
                                    />
                                </div>

                                <div className="flex space-x-4">
                                    <div className="flex-1 flex flex-col">
                                        <label className="text-ghost-white text-lg font-medium">Age</label>
                                        <input
                                            className="w-full px-3 py-2 mt-2 text-gray-200 bg-dark-gray bg-opacity-70 rounded focus:outline-none focus:ring-2 focus:ring-neon-orange"
                                            type="number"
                                            value={age}
                                            onChange={(e) => setAge(e.target.value)}
                                        />
                                    </div>
                                    <div className="flex-1 flex flex-col">
                                        <label className="text-ghost-white text-lg font-medium">Occupation</label>
                                        <select
                                            className="w-full px-3 py-2 mt-2 text-gray-200 bg-dark-gray bg-opacity-70 rounded focus:outline-none focus:ring-2 focus:ring-neon-orange"
                                            value={occupation}
                                            onChange={(e) => setOccupation(e.target.value)}
                                        >
                                            <option value="teacher">Teacher</option>
                                            <option value="student">Student</option>
                                        </select>
                                    </div>
                                </div>


                                <div className="flex space-x-4">
                                    <div className="flex-1 flex flex-col">
                                        <label className="text-ghost-white text-lg font-medium">Monthly Income</label>
                                        <input
                                            className="w-full px-3 py-2 mt-2 text-gray-200 bg-dark-gray bg-opacity-70 rounded focus:outline-none focus:ring-2 focus:ring-neon-orange"
                                            type="number"
                                            value={monthlyIncome}
                                            onChange={(e) => setMonthlyIncome(e.target.value)}
                                        />
                                    </div>

                                    <div className="flex-1 flex flex-col">
                                        <label className="text-ghost-white text-lg font-medium">Fixed Expenses</label>
                                        <input
                                            className="w-full px-3 py-2 mt-2 text-gray-200 bg-dark-gray bg-opacity-70 rounded focus:outline-none focus:ring-2 focus:ring-neon-orange"
                                            type="number"
                                            value={fixedExpense}
                                            onChange={(e) => setFixedExpense(e.target.value)}
                                        />
                                    </div>
                                </div>

                                <div className="flex space-x-4">
                                    <div className="flex-1 flex flex-col">
                                        <label className="text-ghost-white text-lg font-medium">Personal Expense Target</label>
                                        <input
                                            className="w-full px-3 py-2 mt-2 text-gray-200 bg-dark-gray bg-opacity-70 rounded focus:outline-none focus:ring-2 focus:ring-neon-orange"
                                            type="number"
                                            value={personalExpenseTarget}
                                            onChange={(e) => setPersonalExpenseTarget(e.target.value)}
                                        />
                                    </div>

                                    <div className="flex-1 flex flex-col">
                                        <label className="text-ghost-white text-lg font-medium">Monthly Saving Goal</label>
                                        <input
                                            className="w-full px-3 py-2 mt-2 text-gray-200 bg-dark-gray bg-opacity-70 rounded focus:outline-none focus:ring-2 focus:ring-neon-orange"
                                            type="number"
                                            value={monthlySavingGoal}
                                            onChange={(e) => setMonthlySavingGoal(e.target.value)}
                                        />
                                    </div>
                                </div>
                                <div className="flex flex-col">
                                    <label className="text-ghost-white text-lg font-medium">Existing Retirement Contributions</label>

                                    {/* TRS Section */}
                                    <div className="flex items-center justify-between mb-2">
                                        <label className="flex items-center text-ghost-white">
                                            <input
                                                type="checkbox"
                                                className="form-checkbox h-5 w-5 text-neon-green bg-dark-gray rounded focus:ring-neon-green focus:outline-none mr-2"
                                                checked={trsChecked}
                                                onChange={() => setTrsChecked(!trsChecked)}
                                            />
                                            TRS
                                        </label>
                                        <input
                                            type="number"
                                            placeholder="Enter TRS Amount"
                                            className="w-64 px-3 py-2 text-gray-200 bg-dark-gray bg-opacity-70 rounded focus:outline-none focus:ring-2 focus:ring-neon-orange"
                                            value={trsAmount}
                                            onChange={(e) => setTrsAmount(e.target.value)}
                                            disabled={!trsChecked}
                                        />
                                    </div>

                                    {/* 403(b) Section */}
                                    <div className="flex items-center justify-between mb-2">
                                        <label className="flex items-center text-ghost-white">
                                            <input
                                                type="checkbox"
                                                className="form-checkbox h-5 w-5 text-neon-green bg-dark-gray rounded focus:ring-neon-green focus:outline-none mr-2"
                                                checked={b403Checked}
                                                onChange={() => setB403Checked(!b403Checked)}
                                            />
                                            403(b)
                                        </label>
                                        <input
                                            type="number"
                                            placeholder="Enter 403(b) Amount"
                                            className="w-64 px-3 py-2 text-gray-200 bg-dark-gray bg-opacity-70 rounded focus:outline-none focus:ring-2 focus:ring-neon-orange"
                                            value={b403Amount}
                                            onChange={(e) => setB403Amount(e.target.value)}
                                            disabled={!b403Checked}
                                        />
                                    </div>

                                    {/* TRA Section */}
                                    <div className="flex items-center justify-between mb-4">
                                        <label className="flex items-center text-ghost-white">
                                            <input
                                                type="checkbox"
                                                className="form-checkbox h-5 w-5 text-neon-green bg-dark-gray rounded focus:ring-neon-green focus:outline-none mr-2"
                                                checked={traChecked}
                                                onChange={() => setTraChecked(!traChecked)}
                                            />
                                            TRA
                                        </label>
                                        <input
                                            type="number"
                                            placeholder="Enter TRA Amount"
                                            className="w-64 px-3 py-2 text-gray-200 bg-dark-gray bg-opacity-70 rounded focus:outline-none focus:ring-2 focus:ring-neon-orange"
                                            value={traAmount}
                                            onChange={(e) => setTraAmount(e.target.value)}
                                            disabled={!traChecked}
                                        />
                                    </div>
                                </div>


                                <div className="flex flex-col">
                                    <label className="text-ghost-white text-lg font-medium">Retirement Age Goal</label>
                                    <input
                                        className="w-full px-3 py-2 mt-2 text-gray-200 bg-dark-gray bg-opacity-70 rounded focus:outline-none focus:ring-2 focus:ring-neon-orange"
                                        type="number"
                                        value={retirementAgeGoal}
                                        onChange={(e) => setRetirementAgeGoal(e.target.value)}
                                    />
                                </div>

                                <div className="flex items-center justify-center">
                                    <button
                                        className="poison-button relative w-[16rem] px-4 py-2 bg-neon-orange text-white font-bold rounded shadow-black hover:bg-purple-700 transition duration-150 ease-in-out overflow-hidden mt-6"
                                        type="button"
                                        onClick={dataSubmittedForSignup}
                                    >
                                        <span className="relative z-10">Sign Up</span>
                                        <div className="bubble"></div>
                                        <div className="bubble"></div>
                                        <div className="bubble"></div>
                                        <div className="bubble"></div>
                                        <div className="bubble"></div>
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Signup;
