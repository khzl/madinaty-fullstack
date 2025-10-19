import { useNavigate } from "react-router-dom";
import Posts from "../components/Posts";
import { useEffect, useState } from "react";

const Reports = () => {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate(-1);
  };

  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      console.log(window.scrollY);

      setScrolled(window.scrollY > 220);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.code === "Space") {
        e.preventDefault();
        navigate(-1);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [navigate]);

  return (
    <div className="px-4 lg:px-0 flex flex-col justify-center items-center lg:mx-[100px] mt-2  mb-10">
      <button
        onClick={handleBack}
        className={`bg-gray-300 cursor-pointer sticky top-3 left-0 z-50 lg:hover:scale-95  active:scale-95 transition-all duration-[0.1s] active:bg-gray-400 mb-8 lg:w-[970px] h-[68px]  rounded-[21px] flex justify-center items-center ${
          scrolled ? "w-1/3  " : "w-full "
        }`}
      >
        <p className="opacity-50 text-xl">رجوع</p>
      </button>
      <Posts />
      <Posts />
      <Posts />
    </div>
  );
};

export default Reports;
