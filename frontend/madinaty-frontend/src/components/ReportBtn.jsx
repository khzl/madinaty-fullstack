const ReportBtn = () => {
  return (
    <div className="w-full px-4 flex justify-center items-center ">
      <div className="w-[388px] rounded-[21px] flex flex-1 justify-between px-8 items-center h-[68px] bg-[#FFCD18] active:bg-yellow-500">
        <p className=" text-[#3C3C3C] text-4xl pt-2 leading-[26px] ">+</p>
        <p className=" text-[#3C3C3C] text-xl leading-[26px]  ">
          الإبلاغ عن مشكلة
        </p>
      </div>
    </div>
  );
};

export default ReportBtn;
