import React from "react";

const About = () => {
  return (
    <div className=" flex flex-col lg:flex-row gap-5 px-8 items-center justify-center  my-8  ">
      {/* About Card */}
      <div className=" z-10 bg-white  rounded-[21px] p-10 w-[420px] text-center border border-white/30">
        <h1 className="text-3xl font-bold  mb-4">About Us</h1>
        <p className="text-gray-700 leading-relaxed">
          Welcome to <span className="font-semibold ">Our App</span> — a simple
          and elegant platform built to make your experience smooth and
          enjoyable.
        </p>

        <p className="mt-4 text-gray-700 leading-relaxed">
          Designed with care using modern technologies, we aim to bring you a
          seamless, fast, and visually pleasing user experience. Whether you’re
          here to explore, connect, or create — this is your space.
        </p>
      </div>
    </div>
  );
};

export default About;
