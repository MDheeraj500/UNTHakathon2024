import React, { useState, useEffect } from 'react'
import crystalBall from "../assets/crystal-ball.png"
import angle from "../assets/angel.webp"
import zombie from "../assets/zombie-face.webp"
import Navbar from './navbar'
import Cookies from "js-cookie"
import axios from "axios";

const RetirementPlan = () => {
    const [saving, setSaving] = useState(null) // Changed to `null` to handle no data case
    
    useEffect(() => {
        const fetchExpenses = async () => {
            try {
                // Get user_id from cookies
                const user_id = Cookies.get("user_id");
                if (!user_id) {
                    console.error("User ID not found in cookies");
                    return;
                }

                // Make request to the dashboard endpoint with user_id
                const response = await axios.get(`http://127.0.0.1:5000/calculate_savings/${user_id}`);
                console.log("Response data:", response.data);
                setSaving(response.data);
            } catch (error) {
                console.error("Error fetching expenses:", error);
            }
        };

        fetchExpenses();
    }, []);

    const IS_GONNA_LIVE = saving && saving.suggestion === "1";
    const mainText = IS_GONNA_LIVE ? "You will live with the angels" : "You will be a financial zombie";

    return (
        <div className="h-screen w-full font-inter bg-zinc-900 text-white relative overflow-hidden">
            <Navbar />
            <h2 className="w-full text-8xl font-bold text-center my-6 griffy-regular">Your Future</h2>
            <div className="flex flex-col">
                <div className="flex flex-row items-center justify-center gap-80 relative">
                    <CrystalBall
                        imageSrc={crystalBall}
                        altText="crystal ball"
                        titleText={saving ? saving.feasible_savings : "Loading..."}
                        descText={"Short-Term Savings"}
                    />
                    <CrystalBall
                        imageSrc={crystalBall}
                        altText="crystal ball"
                        titleText={saving ? saving.required_monthly_savings : "Loading..."}
                        descText={"Monthly Retirement savings"}
                    />
                </div>
                <div className='absolute top-[40%] left-1/2 transform -translate-x-1/2'>
                    <div className="flex relative">
                        <img
                            src={crystalBall}
                            alt="crystal ball"
                            height={470}
                            width={470}
                        />
                        <div className="absolute top-[17%] left-1/2 transform -translate-x-1/2">
                            {IS_GONNA_LIVE ? <img alt='angel' src={angle} height={100} width={100} />
                                : <img alt='zombie' src={zombie} height={200} width={200} />}
                        </div>
                        <h2 className="absolute bottom-[10%] left-1/2 transform -translate-x-1/2 font-extrabold text-3xl w-60 text-center text-black">
                            {mainText}
                        </h2>
                    </div>
                </div>
            </div>
            <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2">
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
    )
}

export default RetirementPlan

const CrystalBall = ({ imageSrc, altText, titleText, descText }) => (
    <div className="flex relative">
        <img
            src={imageSrc}
            alt={altText}
            height={400}
            width={400}
        />
        <h2 className="absolute top-[35%] left-1/2 transform -translate-x-1/2 font-extrabold text-6xl text-black">
            {titleText}
        </h2>
        <h2 className="absolute bottom-[10%] left-1/2 transform -translate-x-1/2 font-extrabold text-3xl w-40 text-center text-black">
            {descText}
        </h2>
    </div>
);