const About = () => {
  return (
    <div className="container mx-auto py-12">
      <div className="flex justify-center items-center pb-12">
        <h1 className="uppercase font-bold font-roboto lg:text-5xl md:text-3xl text-2xl pb-3 border-b-4 border-blue-600">
          About Us
        </h1>
      </div>
      <div className="flex flex-col-reverse md:flex-row justify-between items-center gap-8">
        <div className="md:w-1/2 w-full">
          <img src="https://i.ibb.co/HtcfVn7/about.jpg" alt="" />
        </div>
        <div className="md:w-1/2 w-full md:text-left text-center lg:space-y-5 space-y-2">
          <h1 className="uppercase font-roboto font-bold lg:text-5xl md:text-3xl text-xl">
            Who We Are?
          </h1>
          <p className="lg:w-5/6 w-full md:px-0 px-2 font-lato lg:text-base text-sm">
            <span className="font-roboto font-bold uppercase">Asset<span className="text-primary font-lato">H</span>ub</span> Company is a team of passionate professionals dedicated to
            simplifying asset management processes. With years of collective
            experience in software development and a deep understanding of the
            challenges faced by modern businesses, we strive to deliver
            cutting-edge solutions tailored to meet our client's needs.
          </p>
          <button className="uppercase px-3 py-3 bg-primary text-white font-roboto font-bold">
            Learn More
          </button>
        </div>
      </div>
    </div>
  );
};

export default About;
