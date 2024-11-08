import React from "react";

const Slider = () => {
  return (
    <div className="relative">
      {/* Carousel Structure */}
      <div className="carousel w-full">
        {/* Item 1 */}
        <div id="item1" className="carousel-item w-full relative">
          <img
            src="https://images.pexels.com/photos/5999834/pexels-photo-5999834.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
            alt="Tech Lead"
            className="w-full object-cover h-[500px]"
          />
          {/* Overlay with text */}
          <div className="absolute inset-0 bg-opacity-60 bg-black flex justify-center items-center text-center text-white p-4">
            <div className="space-y-4">
              <h1 className="font-roboto text-4xl font-bold">Innovate Your Career with Cutting-Edge Technology</h1>
              <p className="font-lato text-lg font-thin">
                Dive into the world of tech innovation and become a part of a team that is shaping the future. Join us as a Tech Lead and make an impact through groundbreaking projects.
              </p>
            </div>
          </div>
        </div>
        {/* Item 2 */}
        <div id="item2" className="carousel-item w-full relative">
          <img
            src="https://images.pexels.com/photos/5999834/pexels-photo-5999834.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
            alt="Growth Coach"
            className="w-full object-cover h-[500px]"
          />
          {/* Overlay with text */}
          <div className="absolute inset-0 bg-opacity-60 bg-black flex justify-center items-center text-center text-white p-4">
            <div className="space-y-4">
              <h1 className="font-roboto text-4xl font-bold">Unlock Your Potential in Personal Growth</h1>
              <p className="font-lato text-lg font-thin">
                Take the first step towards unlocking your full potential. Join us as a Growth Coach and help others achieve their personal and professional goals.
              </p>
            </div>
          </div>
        </div>
        {/* Item 3 */}
        {/* <div id="item3" className="carousel-item w-full">
          <img
            src="https://img.daisyui.com/images/stock/photo-1625726411847-8cbb60cc71e6.webp"
            alt="Image 3"
            className="w-full object-cover h-[500px]"
          />
        </div> */}
        {/* Item 4 */}
        {/* <div id="item4" className="carousel-item w-full">
          <img
            src="https://img.daisyui.com/images/stock/photo-1665553365602-b2fb8e5d1707.webp"
            alt="Image 4"
            className="w-full object-cover h-[500px]"
          />
        </div> */}
      </div>

      {/* Navigation Buttons */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2 py-2 z-10">
        <a href="#item1" className="btn btn-xs">1</a>
        <a href="#item2" className="btn btn-xs">2</a>
        <a href="#item3" className="btn btn-xs">3</a>
        <a href="#item4" className="btn btn-xs">4</a>
      </div>
    </div>
  );
};

export default Slider;
