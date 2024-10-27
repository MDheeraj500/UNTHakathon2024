import axios from "axios"
import Cookies from "js-cookie"
import React, { useEffect, useState } from 'react'
import angle from "../assets/angel.webp"
import crystalBall from "../assets/crystal-ball.png"
import cuteGhost from "../assets/cute-ghost.png"
// import scareCrowImage from "../assets/scare-crow-2.png"
import pumkin from "../assets/pumkin.png"
import zombie from "../assets/zombie-face.webp"
import Navbar from './navbar'

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
    // const IS_GONNA_LIVE = true

    const mainText = IS_GONNA_LIVE ? "You will live with the angels" : "Let's see are you a financial zombie or not?";

    return (
        <div className="h-screen w-full font-inter bg-zinc-900 text-white relative overflow-hidden bg-gradient-to-tr from-orange-400/15  to-zinc-900">
            <Navbar />
            <h2 className="w-full text-8xl font-bold text-center my-6 griffy-regular bg-gradient-to-r from-orange-700 to-gray-50 bg-clip-text text-transparent">Your Future</h2>
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
                <div className='absolute top-[25%] left-1/2 transform -translate-x-1/2'>
                    <div className="flex relative">
                        <img
                            src={crystalBall}
                            alt="crystal ball"
                            height={550}
                            width={550}
                        />
                        <div className="absolute top-[17%] left-1/2 transform -translate-x-1/2">
                            {IS_GONNA_LIVE ?
                                <div className="relative">
                                    <div className="absolute inset-0 rounded-full bg-yellow-500 blur-lg"></div>
                                    <img alt='angel' src={angle} height={100} width={100} className="relative" />
                                </div>
                                : <div className="relative">
                                    <div className="absolute inset-0 rounded-full bg-green-500 blur-lg"></div>
                                    <img alt='zombie' src={zombie} height={400} width={400} className="relative" />
                                </div>}
                        </div>
                        <h2 className="absolute bottom-[10%] left-1/2 transform -translate-x-1/2 font-extrabold text-3xl w-60 text-center text-black" style={{
                            textShadow: IS_GONNA_LIVE
                                ? '0 0 10px rgba(255, 165, 0, 0.8), 0 0 20px rgba(255, 165, 0, 0.6), 0 0 30px rgba(255, 140, 0, 0.5)'
                                : '0 0 10px rgba(34, 197, 94, 0.8), 0 0 20px rgba(34, 197, 94, 0.6), 0 0 30px rgba(34, 197, 94, 0.5)',
                        }}>
                            {mainText}
                        </h2>
                    </div>
                </div>
            </div>
            <div className="z-[150] absolute bottom-[5rem] left-1/2 transform -translate-x-1/2">
                <button
                    onClick={() => window.open("https://clear-cash.streamlit.app/", "_blank")}
                    className="poison-button relative w-[16rem] px-4 py-4 bg-neon-orange text-white font-bold rounded shadow-black hover:bg-purple-700 hover:shadow-[0_0_100px_white] transition duration-150 ease-in-out overflow-hidden"
                >
                    <span className="relative z-10">Learn More</span>
                    <div className="bubble"></div>
                    <div className="bubble"></div>
                    <div className="bubble"></div>
                    <div className="bubble"></div>
                    <div className="bubble"></div>
                </button>
            </div>

            <div className="absolute bottom-0 left-0 pumkin">

                <img
                    src={pumkin}
                    width={400}
                    height={400}
                />


            </div>
            <div className="absolute -bottom-0 -right-0 cute-ghost">

                <img
                    src={cuteGhost}
                    width={200}
                    height={200}
                />


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
            className="opacity-60"
        />
        {/* Title Text with Orange Glow */}
        {/* <h2 className="absolute top-[35%] left-1/2 transform -translate-x-1/2 font-extrabold text-6xl text-black"
            style={{
                textShadow: '0 0 10px rgba(255, 165, 0, 0.8), 0 0 20px rgba(255, 165, 0, 0.6), 0 0 30px rgba(255, 140, 0, 0.5)', // Orange glow
            }}
        >
            {titleText}
        </h2>

      
        <h2 className="absolute bottom-[10%] left-1/2 transform -translate-x-1/2 font-extrabold text-3xl w-40 text-center text-black" style={{
            textShadow: '0 0 10px rgba(255, 165, 0, 0.8), 0 0 20px rgba(255, 165, 0, 0.6), 0 0 30px rgba(255, 140, 0, 0.5)', // Orange glow
        }}>
            {descText}
        </h2> */}
    </div>
);