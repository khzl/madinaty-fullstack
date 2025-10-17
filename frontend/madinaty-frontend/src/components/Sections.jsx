import { Link } from "react-router-dom";
import ReportBtn from "./ReportBtn";
import { useState } from "react";
import AddReport from "../pages/AddReport";

const Sections = () => {
  const [open, setOpen] = useState(false);

  return (
    <div className="w-full my-4 flex flex-col lg:relative direction-rtl lg:grid grid-cols-5 lg:gap-7  justify-center lg:px-20 px-4 ">
      <Link to="/add-report" className="hidden  lg:block flex-1 ">
        <ReportBtn />
      </Link>

      {/* sections */}
      <Link
        to="/reports"
        className="h-[126px] lg:h-[313px] hover:scale-103 active:scale-95 transition duration-[0.2s] direction-ltr lg:flex-none mb-2 flex-1 active:bg-gray-100 rounded-[21px]   flex  lg:flex-col bg-white"
      >
        <div className="w-1/3 lg:w-full lg:h-[195px]  bg-gray-400 overflow-hidden lg:rounded-t-[21px] lg:rounded-bl-[0px] rounded-l-[21px]"></div>
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
      </Link>
    </div>
  );
};

export default Sections;

// {/* pop up for adding a report */}
// {open && (
//   <div
//     className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
//     onClick={() => setOpen(false)} //
//   >
//     <div
//       onClick={(e) => e.stopPropagation()}
//       className="bg-white rounded-2xl shadow-lg  h-[90%] w-[90%]  animate-fadeIn"
//     >
//       <AddReport />
//     </div>
//   </div>
// )}
