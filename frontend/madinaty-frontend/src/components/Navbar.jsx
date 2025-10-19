import { Link, useLocation } from "react-router-dom";
import home from "../assets/images/home.png";
import done from "../assets/images/done.png";
import about from "../assets/images/about.png";

const Navbar = () => {
  const location = useLocation();
  const isActive = (path) => location.pathname === path;

  return (
    <div className="w-full h-[150px] my-2 direction-rtl flex items-center justify-between lg:justify-center px-2">
      {/* Home */}
      <Link
        to="/home"
        className={`h-[113px] w-[113px] lg:h-[103px] lg:w-[313px] mx-2 flex-1 lg:flex-none lg:flex-row flex flex-col justify-center items-center rounded-[21px] bg-white hover:bg-gray-100 active:scale-95 active:bg-gray-300 transition duration-[0.1s]
          ${
            isActive("/home")
              ? "border-2 border-[#f8cf4e]"
              : "border border-transparent"
          }
        `}
      >
        <img
          className="mt-4 lg:mt-0 lg:ml-4 lg:h-[29px] h-[39px] opacity-45"
          src={home}
        />
        <p className="mt-2 text-sm opacity-45">الرئيسية</p>
      </Link>

      {/* Done */}
      <Link
        to="/fixed"
        className={`h-[113px] w-[113px] lg:h-[103px] lg:w-[313px] mx-2 flex-1 lg:flex-none lg:flex-row flex flex-col justify-center items-center rounded-[21px] bg-white hover:bg-gray-100 active:scale-95 active:bg-gray-300 transition duration-[0.1s]
          ${
            isActive("/fixed")
              ? "border-2 border-[#f8cf4e]"
              : "border border-transparent"
          }
        `}
      >
        <img
          className="mt-4 lg:mt-0 lg:ml-4 lg:h-[29px] h-[39px] opacity-45"
          src={done}
        />
        <p className="mt-2  text-sm opacity-45">تم إنجازه</p>
      </Link>

      <Link
        to="/about"
        className={`h-[113px] w-[113px] lg:h-[103px] lg:w-[313px]  mx-2 flex-1 lg:flex-none lg:flex-row flex flex-col justify-center items-center rounded-[21px] bg-white hover:bg-gray-100 active:scale-95 active:bg-gray-300 transition duration-[0.1s]
          ${
            isActive("/about")
              ? "border-2 border-[#f8cf4e]"
              : "border border-transparent"
          }
        `}
      >
        <img
          className="mt-4 lg:mt-1 lg:ml-3 lg:h-[30px] h-[39px] opacity-45"
          src={about}
        />
        <p className="mt-2  text-sm opacity-45">حول</p>
      </Link>
    </div>
  );
};

export default Navbar;
