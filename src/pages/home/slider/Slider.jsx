import React, { useRef, useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
// import required modules
import { Navigation } from "swiper/modules";
import { Link } from "react-router-dom";

const Slider = () => {
  return (
    <div className="">
      <Swiper
        modules={[Navigation]}
        loop={true}
        navigation={true}
        className="mySwiper lg:h-[780px] md:h-[550px] h-[220px] "
      >
        <SwiperSlide className="relative">
          <div className="absolute bg-opacity-75 w-full h-full bg-black ">
            <div className="container h-full mx-auto md:space-y-5 space-y-1 flex flex-col justify-center items-center ">
              <h1 className="xl:w-3/6 lg:w-4/6 md:w-3/6 w-5/6 font-roboto md:mx-0 mx-auto text-center font-bold lg:text-5xl md:text-3xl text-xl text-white">
                Shape the Future of Talent Management
              </h1>
              <p className="md:text-base text-xs text-center font-lato md:w-2/6 w-4/6 md:mx-0 mx-auto font-thin text-white ">
                Are you passionate about driving organizational success through
                strategic HR management? Join us as an HR Manager and lead the
                way in creating a thriving workplace culture.
              </p>
              <Link to="/join-as-hr">
                <button className="px-3 md:py-3 py-2 lg:text-base md:text-sm text-xs bg-primary text-white font-roboto font-bold uppercase">
                  Join as HR Manager
                </button>
              </Link>
            </div>
          </div>
          <img src="https://i.ibb.co/Bzt9PRc/hrmanager.jpg" alt="" />
        </SwiperSlide>
        <SwiperSlide className="relative">
          <div className="absolute bg-opacity-75 w-full h-full bg-black ">
            <div className="container h-full mx-auto md:space-y-5 space-y-1 flex flex-col justify-center items-center ">
              <h1 className="xl:w-3/6 lg:w-4/6 md:w-3/6 w-5/6 font-roboto md:mx-0 mx-auto text-center font-bold lg:text-5xl md:text-3xl text-xl text-white">
                Embark on a Rewarding Career Journey
              </h1>
              <p className="md:text-base text-xs text-center font-lato md:w-2/6 w-4/6 md:mx-0 mx-auto font-thin text-white ">
                Are you passionate about driving organizational success through
                strategic HR management? Join us as an HR Manager and lead the
                way in creating a thriving workplace culture.
              </p>
              <Link to="/join-as-employee">
                <button className="px-3 md:py-3 py-2 lg:text-base md:text-sm text-xs bg-primary text-white font-roboto font-bold uppercase">
                  Join as Employee
                </button>
              </Link>
            </div>
          </div>
          <img src="https://i.ibb.co/tHvMPQq/employee.jpg" alt="" />
        </SwiperSlide>
      </Swiper>
    </div>
  );
};

export default Slider;
