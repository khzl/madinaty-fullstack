import home from "../assets/images/home.png";
import done from "../assets/images/done.png";
import donation from "../assets/images/dontations.png";

const Navbar = () => {
  return (
    <div className="w-full h-[150px] my-2 direction-rtl   flex items-center justify-between px-2 ">
      <div className="h-[113px] w-[113px] mx-2 flex-1 active:bg-gray-100 rounded-[21px] flex flex-col justify-center items-center bg-white">
        <img className=" mt-4 h-[39px] opacity-45" src={home} />
        <p className=" mt-2 text-sm opacity-45 ">الرئيسية</p>
      </div>
      <div className="h-[113px] w-[113px] mx-2 flex-1 active:bg-gray-100 rounded-[21px] flex flex-col justify-center items-center bg-white">
        <img className=" mt-4 h-[39px] opacity-45" src={done} />
        <p className=" mt-2 text-sm opacity-45 ">تم انجازه</p>
      </div>
      <div className="h-[113px] w-[113px] mx-2 flex-1 active:bg-gray-100 rounded-[21px] flex flex-col justify-center items-center bg-white">
        <img className=" mt-4 h-[39px] opacity-45" src={donation} />
        <p className=" mt-2 text-sm opacity-45 ">ابرز المتبرعين</p>
      </div>
    </div>
  );
};

export default Navbar;
