import { useEffect, useState } from "react";
import upvote from "../assets/images/upvote.png";
import location from "../assets/images/location.png";

const Done = () => {
  const [completedReports, setCompletedReports] = useState([]);

  useEffect(() => {
    const storedReports = JSON.parse(localStorage.getItem("reports")) || [];
    const completedOnes = storedReports.filter((r) => r.completed === true);
    const sortedCompleted = completedOnes.sort(
      (a, b) =>
        (b.date ? new Date(b.date) : 0) - (a.date ? new Date(a.date) : 0)
    );
    setCompletedReports(sortedCompleted);
  }, []);

  if (completedReports.length === 0) {
    return (
      <div className="direction-rtl w-full flex flex-col justify-center px-4 items-center mt-8">
        <p className="opacity-60">لا توجد مشاكل منجزة بعد ✅</p>
      </div>
    );
  }

  return (
    <div className="direction-rtl w-full flex flex-col lg:grid lg:grid-cols-3 gap-5  justify-center px-8 items-center">
      {completedReports.map((report) => (
        <div
          key={report.id}
          className="flex flex-col justify-center w-full mb-12 max-w-md"
        >
          {/* Username */}
          <div className="flex flex-row items-center mb-2">
            <div className="bg-gray-400 w-[24px] h-[24px] rounded-full"></div>
            <p className="text-center mx-2">{report.username || "مستخدم"}</p>
          </div>

          {/* Description */}
          <p className="mb-2 opacity-70 px-2">{report.description}</p>

          {/* Image */}
          {report.image ? (
            <img
              src={report.image}
              alt="report"
              className="w-full h-[266px] mb-2 object-cover bg-gray-300 rounded-[21px]"
            />
          ) : (
            <div className="w-full h-[266px] mb-2 bg-gray-300 rounded-[21px]"></div>
          )}

          {/* Status + Location */}
          <div className="w-full flex flex-row gap-3 justify-between items-center">
            <div className="bg-white w-1/3 h-[36px] border-green-600 border-[0.5px] flex flex-row justify-center items-center rounded-[18px]">
              <p className="opacity-70 text-green-800 mt-1">منجز</p>
            </div>

            <div className="bg-gray-300 w-1/3 h-[36px] flex flex-row justify-center items-center rounded-[18px]">
              <img src={location} className="w-[20px] opacity-40 h-[20px]" />
              <p className="opacity-40 text-[13px]">{report.location}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Done;
