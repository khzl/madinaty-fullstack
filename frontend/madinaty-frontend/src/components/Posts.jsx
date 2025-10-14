import upvote from "../assets/images/upvote.png";
import location from "../assets/images/location.png";

const Posts = () => {
  return (
    <div className="direction-rtl  w-full  flex flex-col justify-center px-4  items-center ">
      <div className="flex flex-col justify-center w-full mb-12  max-w-md">
        <div className="flex flex-row items-center mb-2">
          <div className="bg-gray-400 w-[24px] h-[24px] rounded-full"></div>
          <p className="text-center mx-2">jasm_ahmad234</p>
        </div>
        <p className="mb-2 opacity-70 px-2">
          يسنم بتيسشن شنمس يتب مكن سيبم نتمسيب
        </p>
        <div className="w-full h-[266px] mb-2 bg-gray-300 overflow-hidden rounded-[21px]"></div>
        <div className="w-full flex flex-row gap-3 justify-between items-center">
          <div className="bg-gray-300 w-1/3 h-[36px] flex flex-row justify-center items-center rounded-[18px]">
            <img src={upvote} className="w-[18px] opacity-40 h-[18px] ml-1 " />
            <p className="opacity-70 mt-1">2</p>
          </div>
          <div className="bg-[#FFCD18]  w-1/3 h-[36px] flex flex-row justify-center items-center  rounded-[18px]">
            <p className="opacity-65">تبرع</p>
          </div>
          <div className="bg-gray-300 w-1/3 h-[36px] flex flex-row justify-center items-center  rounded-[18px]">
            <img src={location} className="w-[20px] opacity-40 h-[20px]  " />
            <p className="opacity-40  text-[13px]">حي المثنى</p>
          </div>
        </div>
      </div>

      <div className="flex flex-col justify-center w-full mb-12  max-w-md">
        <div className="flex flex-row items-center mb-2">
          <div className="bg-gray-400 w-[24px] h-[24px] rounded-full"></div>
          <p className="text-center mx-2">jasm_ahmad234</p>
        </div>
        <p className="mb-2 opacity-70 px-2">
          يسنم بتيسشن شنمس يتب مكن سيبم نتمسيب
        </p>
        <div className="w-full h-[266px] mb-2 bg-gray-300 overflow-hidden rounded-[21px]"></div>
        <div className="w-full flex flex-row gap-3 justify-between items-center">
          <div className="bg-gray-300 w-1/3 h-[36px] flex flex-row justify-center items-center rounded-[18px]">
            <img src={upvote} className="w-[18px] opacity-40 h-[18px] ml-1 " />
            <p className="opacity-70 mt-1">2</p>
          </div>
          <div className="bg-[#FFCD18]  w-1/3 h-[36px] flex flex-row justify-center items-center  rounded-[18px]">
            <p className="opacity-65">تبرع</p>
          </div>
          <div className="bg-gray-300 w-1/3 h-[36px] flex flex-row justify-center items-center  rounded-[18px]">
            <img src={location} className="w-[20px] opacity-40 h-[20px]  " />
            <p className="opacity-40  text-[13px]">حي المثنى</p>
          </div>
        </div>
      </div>

      <div className="flex flex-col justify-center w-full mb-12  max-w-md">
        <div className="flex flex-row items-center mb-2">
          <div className="bg-gray-400 w-[24px] h-[24px] rounded-full"></div>
          <p className="text-center mx-2">jasm_ahmad234</p>
        </div>
        <p className="mb-2 opacity-70 px-2">
          يسنم بتيسشن شنمس يتب مكن سيبم نتمسيب
        </p>
        <div className="w-full h-[266px] mb-2 bg-gray-300 overflow-hidden rounded-[21px]"></div>
        <div className="w-full flex flex-row gap-3 justify-between items-center">
          <div className="bg-gray-300 w-1/3 h-[36px] flex flex-row justify-center items-center rounded-[18px]">
            <img src={upvote} className="w-[18px] opacity-40 h-[18px] ml-1 " />
            <p className="opacity-70 mt-1">2</p>
          </div>
          <div className="bg-[#FFCD18]  w-1/3 h-[36px] flex flex-row justify-center items-center  rounded-[18px]">
            <p className="opacity-65">تبرع</p>
          </div>
          <div className="bg-gray-300 w-1/3 h-[36px]  flex flex-row justify-center items-center  rounded-[18px]">
            <img src={location} className="w-[20px] opacity-40 h-[20px]  " />
            <p className="opacity-40  text-[13px]">حي المثنى</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Posts;
