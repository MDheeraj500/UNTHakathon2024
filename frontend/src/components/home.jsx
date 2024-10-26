import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css"; // Import Swiper styles
import Navbar from "./navbar"; // Import the Navbar component

export default function Home() {
    return (
        <div className="min-h-screen bg-gray-100">
            <Navbar /> {/* Common Navigation Bar */}
            {/* Carousel Section */}
            <div className="container mx-auto mt-8">
                <Swiper
                    spaceBetween={50}
                    slidesPerView={1}
                    loop={true}
                    autoplay={{ delay: 3000, disableOnInteraction: false }} // Autoplay configuration
                >
                    <SwiperSlide>
                        <div className="bg-blue-500 h-64 flex items-center justify-center text-white text-2xl font-bold">
                            Slide 1
                        </div>
                    </SwiperSlide>
                    <SwiperSlide>
                        <div className="bg-green-500 h-64 flex items-center justify-center text-white text-2xl font-bold">
                            Slide 2
                        </div>
                    </SwiperSlide>
                    <SwiperSlide>
                        <div className="bg-red-500 h-64 flex items-center justify-center text-white text-2xl font-bold">
                            Slide 3
                        </div>
                    </SwiperSlide>
                </Swiper>
            </div>
        </div>
    );
}
