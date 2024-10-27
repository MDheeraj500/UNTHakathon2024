import React from 'react'
import crystalBall from "..//assets/crystal-ball.png"
import angle from "../assets/angel.webp"
import zombie from "../assets/zombie-face.webp"
import Navbar from './navbar'

const RetirementPlan = () => {

    const IS_GONNA_LIVE = true

    const mainText = IS_GONNA_LIVE ? "You will live with the angles" : "You will be a financial zombie"
    return (
        <div className="h-screen w-full font-inter bg-zinc-900 text-white relative overflow-hidden  ">
            <Navbar />
            <h2 className="w-full text-8xl font-bold text-center   my-6 griffy-regular">Your Future</h2>
            <div className="flex flex-col">

                <div className="flex flex-row items-center justify-center gap-80 relative">
                    <CrystalBall imageSrc={crystalBall} altText="crystal ball" titleText={234} descText={"Long Term Saving"} />

                    <CrystalBall imageSrc={crystalBall} altText="crystal ball" titleText={234} descText={"Short Term Savings"} />

                </div>
                <div className='absolute top-[40%] left-1/2 transform -translate-x-1/2'>
                    <div className="flex relative">
                        <img
                            src={crystalBall}
                            alt="crystal ball"
                            height={470}
                            width={470}
                        />
                        <div className="absolute top-[17%] left-1/2 transform -translate-x-1/2 ">
                            {IS_GONNA_LIVE ? <img alt='angle' src={angle} height={100} width={100} />
                                : <img alt='zombie' src={zombie} height={200} width={200} />}
                        </div>

                        <h2 className="absolute bottom-[10%] left-1/2 transform -translate-x-1/2 font-extrabold text-3xl w-60 text-center text-black">
                            {mainText}
                        </h2>

                    </div>
                </div>
            </div>
            <div className="absolute bottom-10 left-1/2  transform -translate-x-1/2">
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

