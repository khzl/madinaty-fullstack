import React from "react";
import CancelBtn from "../components/CancelBtn";

const Profile = () => {
  return (
    <div className="w-full h-screen flex flex-col  justify-between direction-rtl p-4 gap-10">
      <div className="lg:hidden">
        <CancelBtn />
      </div>
      <div className="flex flex-col  lg:mt-20 ">
        <h2 className="text-[32px] opacity-70">الملف الشخصي</h2>
        <div className="flex flex-col lg:flex-row lg:mt-8 lg:w-1/2 gap-8">
          <div className="w-full flex flex-col  justify-center items-center lg:mt-0 mt-4">
            <p className="mt-8 opacity-60">تغيير صورة الملف الشخصي:</p>
            <div className="bg-gray-300 mb-4 w-[188px] h-[188px] rounded-full"></div>
            <button className="bg-gray-300 w-[146px] mt-2 border-[0.3px] border-gray-400 h-[40px] rounded-[15px] flex justify-center items-center">
              <p className="opacity-50 text-xl">اضافة ملف</p>
            </button>
          </div>
          <div className=" lg:w-full flex flex-col    ">
            <p className="mt-8 opacity-60">تغيير اسم المستخدم:</p>
            <input className="bg-white mt-2 lg:w-full h-[60px] border-[0.3px] border-gray-400 rounded-[17px]" />
            <p className="mt-6 opacity-60">تغيير كلمة المرور:</p>
            <input className="bg-white mt-2 lg:w-full h-[60px] border-[0.3px] border-gray-400 rounded-[17px]" />
          </div>
        </div>
      </div>

      <div className="lg:w-1/3 w-full lg:px-0  flex flex-row justify-center items-center gap-4">
        <div className=" lg:w-1/4  rounded-[21px] flex flex-1 justify-center   px-8  items-center h-[68px] bg-[#FFCD18] active:bg-yellow-500">
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

export default Profile;
