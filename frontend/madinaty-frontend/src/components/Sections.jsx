import ReportBtn from "./ReportBtn";
//lg:flex-row lg:flex-wrap lg:justify-start
const Sections = () => {
  return (
    <div className="w-full my-4 flex flex-col  direction-rtl lg:grid grid-cols-5 lg:gap-7  justify-center lg:px-20 px-4 ">
      <div className="hidden  lg:block flex-1 ">
        <ReportBtn />
      </div>

      <div className="h-[126px] lg:h-[313px]  direction-ltr lg:flex-none mb-2 flex-1 active:bg-gray-100 rounded-[21px]   flex  lg:flex-col bg-white">
        <div className="w-1/3 lg:w-full lg:h-[195px] bg-gray-400 overflow-hidden lg:rounded-t-[21px] lg:rounded-bl-[0px] rounded-l-[21px]"></div>
        <div className=" w-full flex flex-col">
          <div className="h-1/3 direction-rtl py-2 px-4 w-full">
            <p className=" mt-2 text-2xl  opacity-70 ">عام</p>
          </div>
          <div className=" direction-rtl py-2 px-4 w-full">
            <p className=" mt-2 text-sm opacity-70 ">
              يمنبت منسيبت سيبتنم ب سينمبت ثص سينمبت ثص تمنب dsfj sdlkjf dsfljk
              sdlkfjتسيب ث يسنمت{" "}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sections;

{
  /* <div className="h-[126px] lg:h-[313px]   lg:flex-none mb-2 flex-1 active:bg-gray-100 rounded-[21px]   flex flex-col bg-white">
<div className="h-[195px] bg-gray-400 overflow-hidden rounded-t-[21px]"></div>
<div className=" w-full flex flex-col">
  <div className="h-1/3 direction-rtl py-2 px-4 w-full">
    <p className=" mt-2 text-2xl  opacity-70 ">عام</p>
  </div>
  <div className=" direction-rtl py-2 px-4 w-full">
    <p className="  text-sm opacity-70 ">
      يمنبت منسيبت سيبتنم ب سينمبت ثص سينمبت ثص تمنب dsfj sdlkjf dsfljk
      sdlkfjتسيب ث يسنمت{" "}
    </p>
  </div>
</div>
</div> */
}
