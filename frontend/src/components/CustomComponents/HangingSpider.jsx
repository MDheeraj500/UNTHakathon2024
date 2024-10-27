import React from 'react';
import '../../../HangingSpider.scss';

const HangingSpider = () => {
    return (
        <div className="h-screen w-full relative overflow-hidden bg z-[1000]">
          

            {/* Second spider */}
            <div className="spider-web z-[1000]"></div>
            <div className="hanging-spider-container z-[1000]">
                <div className="arm-container right z-[1000]">
                    <div className="arm A"><div className="arm B"><div className="arm C"></div></div></div>
                    <div className="arm A"><div className="arm B"><div className="arm C"></div></div></div>
                    <div className="arm A"><div className="arm B"><div className="arm C"></div></div></div>
                    <div className="arm A"><div className="arm B"><div className="arm C"></div></div></div>
                </div>
                <div className="arm-container left z-[1000]">
                    <div className="arm A"><div className="arm B"><div className="arm C"></div></div></div>
                    <div className="arm A"><div className="arm B"><div className="arm C"></div></div></div>
                    <div className="arm A"><div className="arm B"><div className="arm C"></div></div></div>
                    <div className="arm A"><div className="arm B"><div className="arm C"></div></div></div>
                </div>
                <div className="spider-body z-[1000]">
                    <div className="eye eye-left"></div>
                    <div className="eye eye-right"></div>
                </div>
            </div>
        </div>
    );
};

export default HangingSpider;
