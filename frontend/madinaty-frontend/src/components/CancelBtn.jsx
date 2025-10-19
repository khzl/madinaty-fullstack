import React from "react";
import { useNavigate } from "react-router-dom";

const CancelBtn = () => {
  const navigate = useNavigate();

  const handleCancel = () => {
    navigate(-1);
  };

  return (
    <button
      onClick={handleCancel}
      className="bg-gray-300 opacity-75 hover:opacity-100 active:bg-gray-400 transition duration-[0.1s] cursor-pointer lg:w-full lg:h-[68px] w-[124px] h-[50px] rounded-[21px] flex justify-center items-center"
    >
      <p className="opacity-50 text-xl">الغاء</p>
    </button>
  );
};

export default CancelBtn;
