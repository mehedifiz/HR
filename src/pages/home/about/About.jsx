const WhyUs = () => {
  return (
    <div className="container mx-auto py-16 ">
      <div className="flex justify-center items-center pb-8">
        <h1 className="uppercase font-bold font-serif text-4xl text-gray-900">
          Why Choose Us?
        </h1>
      </div>
      <div className="flex flex-col-reverse md:flex-row justify-between items-center gap-12">
        <div className="md:w-1/2 w-full text-center md:text-left">
          <h2 className="uppercase font-serif font-semibold text-3xl text-gray-800 mb-4">
            Our Commitment to Excellence
          </h2>
          <p className="text-gray-600 text-base md:text-lg font-serif mb-6">
            At <span className="font-bold text-indigo-600">Future Forward</span>, we stand out by delivering innovative and reliable solutions tailored to your unique business needs. We believe in building long-term partnerships based on trust, transparency, and a deep commitment to your success.
          </p>
          <p className="text-gray-600 text-base md:text-lg font-serif mb-6">
            Our expert team combines years of experience with cutting-edge technology to empower businesses to thrive in a fast-evolving digital landscape. Choosing us means choosing a partner that is invested in your growth and dedicated to making your vision a reality.
          </p>
           
        </div>
        <div className="md:w-1/2 w-full">
          <img
            src="https://images.pexels.com/photos/6147381/pexels-photo-6147381.jpeg?auto=compress&cs=tinysrgb&w=600" // Replace with your own image URL
            alt="Our Team"
            className="w-full h-auto rounded-lg shadow-xl ring-4 ring-opacity-40 ring-indigo-200"
          />
        </div>
      </div>
    </div>
  );
};

export default WhyUs;
