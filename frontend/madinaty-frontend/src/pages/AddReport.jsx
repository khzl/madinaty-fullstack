import React from "react";
import CancelBtn from "../components/CancelBtn";
import { useNavigate } from "react-router-dom";

const AddReport = () => {
  const navigate = useNavigate();

  const handleDone = () => {
    navigate(-1); //
  };

  return (
    <div className="w-full h-screen flex lg:p-20 flex-col justify-between overflow-y-auto direction-rtl p-4 gap-10">
      <div className="lg:hidden">
        <CancelBtn />
      </div>
      <div className="flex flex-col  ">
        <h2 className="text-[32px] opacity-70">الابلاغ عن مشكلة</h2>
        <p className="mt-8 opacity-60">الوصف:</p>
        <input className="bg-white lg:w-1/2 mt-2 h-[170px] border-[0.3px] border-gray-400 rounded-[21px]" />
        <p className="mt-8 opacity-60">عنوان الموقع:</p>
        <input className="bg-white mt-2 lg:w-1/2 h-[60px] border-[0.3px] border-gray-400 rounded-[17px]" />
        <p className="mt-8 opacity-60">ارفق صورة:</p>
        <button className="bg-gray-300 w-[136px] mt-2 border-[0.3px] border-gray-400 h-[50px] rounded-[15px] flex justify-center items-center">
          <p className="opacity-50 text-xl">اضافة ملف</p>
        </button>
      </div>

      <div className="lg:w-1/3 w-full lg:px-0  flex flex-row justify-center items-center gap-4">
        <div
          onClick={handleDone}
          className=" lg:w-1/4  rounded-[21px] flex flex-1 justify-center   px-8  items-center h-[68px] bg-[#FFCD18] active:bg-yellow-500"
        >
          <p className=" text-[#3C3C3C] text-xl leading-[26px]  text-center ">
            تم{" "}
          </p>
        </div>
        <div className="lg:block hidden lg:w-1/2    ">
          <CancelBtn />
        </div>
      </div>
    </div>
  );
};

export default AddReport;
