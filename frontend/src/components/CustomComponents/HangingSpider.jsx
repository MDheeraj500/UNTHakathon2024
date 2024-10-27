import React from 'react';
import '../../../HangingSpider.scss';

const HangingSpider = () => {
    return (
        <div className="h-screen w-full relative overflow-hidden bg z-[50]">
          

            {/* Second spider */}
            <div className="spider-web z-[50]"></div>
            <div className="hanging-spider-container z-[50]">
                <div className="arm-container right z-[50]">
                    <div className="arm A"><div className="arm B"><div className="arm C"></div></div></div>
                    <div className="arm A"><div className="arm B"><div className="arm C"></div></div></div>
                    <div className="arm A"><div className="arm B"><div className="arm C"></div></div></div>
                    <div className="arm A"><div className="arm B"><div className="arm C"></div></div></div>
                </div>
                <div className="arm-container left z-[50]">
                    <div className="arm A"><div className="arm B"><div className="arm C"></div></div></div>
                    <div className="arm A"><div className="arm B"><div className="arm C"></div></div></div>
                    <div className="arm A"><div className="arm B"><div className="arm C"></div></div></div>
                    <div className="arm A"><div className="arm B"><div className="arm C"></div></div></div>
                </div>
                <div className="spider-body z-[50]">
                    <div className="eye eye-left"></div>
                    <div className="eye eye-right"></div>
                </div>
            </div>
        </div>
    );
};

export default HangingSpider;
