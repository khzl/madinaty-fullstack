const ReportBtn = () => {
  return (
    <div className="w-full lg:px-0 px-4 flex justify-center items-center ">
      <div className="w-[388px]  lg:h-[313px] rounded-[21px] flex lg:flex-col flex-1 justify-between lg:justify-center lg:px-2 px-8  items-center h-[68px] bg-[#FFCD18] active:bg-yellow-500">
        <p className=" text-[#3C3C3C] text-4xl pt-2 leading-[26px] lg:text-7xl mt-20  mb-20">
          +
        </p>
        <p className=" text-[#3C3C3C] text-xl leading-[26px]  text-center ">
          الإبلاغ عن مشكلة
        </p>
      </div>
    </div>
  );
};

export default ReportBtn;
