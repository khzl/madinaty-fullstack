import React, { useState } from "react";
import CancelBtn from "../components/CancelBtn";
import { useNavigate } from "react-router-dom";
import CategoryDropdown from "../components/SectionsDropdown";
import MapPicker from "../components/MapPicker";

const AddReport = () => {
  const navigate = useNavigate();

  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");
  const [image, setImage] = useState(null);
  const [section, setSection] = useState(""); // 🔹 New state for section
  const [coords, setCoords] = useState(null);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => setImage(reader.result);
    reader.readAsDataURL(file);
  };

  const handleDone = () => {
    // Create new report object
    const newReport = {
      id: Date.now(),
      completed: false,
      section, // 🔹 Add selected section
      description,
      location,
      coords,

      image,
      date: new Date().toLocaleString(),
    };

    const existingReports = JSON.parse(localStorage.getItem("reports")) || [];
    existingReports.push(newReport);
    localStorage.setItem("reports", JSON.stringify(existingReports));

    // Reset form
    setDescription("");
    setLocation("");
    setImage(null);
    setSection("");

    navigate(-1);
  };

  return (
    <div className="w-full h-screen flex lg:p-20 flex-col justify-between overflow-y-auto direction-rtl p-4 gap-10">
      <div className="lg:hidden">
        <CancelBtn />
      </div>

      <div className="flex flex-col">
        <h2 className="text-[32px] opacity-70">الإبلاغ عن مشكلة</h2>

        {/* الوصف */}
        <p className="mt-8 opacity-60">الوصف:</p>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="bg-white lg:w-1/2 mt-2 h-[170px] border-[0.3px] border-gray-400 rounded-[21px] p-3 outline-none"
        />

        {/* العنوان */}
        <p className="mt-8 opacity-60">عنوان الموقع:</p>
        <input
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          className="bg-white mt-2 lg:w-1/2 h-[60px] border-[0.3px] border-gray-400 rounded-[17px] p-3 outline-none"
        />
        <div>
          {/* الموقع على الخريطة */}
          <p className="mt-8 opacity-60">حدد الموقع على الخريطة:</p>
          <MapPicker setCoords={setCoords} />
        </div>
        {/* الصورة + القسم */}
        <div className="lg:w-1/2 flex flex-row gap-8">
          <div>
            <p className="mt-8 opacity-60">أرفق صورة:</p>
            <label className="bg-gray-300 w-[136px] mt-2 border-[0.3px] border-gray-400 h-[50px] rounded-[15px] flex justify-center items-center cursor-pointer">
              <p className="opacity-50 text-xl">إضافة ملف</p>
              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleImageUpload}
              />
            </label>
          </div>

          {/* Dropdown for section */}
          <div>
            <CategoryDropdown setSection={setSection} />
          </div>
        </div>

        {image && (
          <img
            src={image}
            alt="preview"
            className="mt-4 w-[200px] h-auto rounded-[10px] border"
          />
        )}
      </div>

      {/* الأزرار */}
      <div className="lg:w-1/3 w-full lg:px-0 flex flex-row justify-center items-center gap-4">
        <div
          onClick={handleDone}
          className="lg:w-1/4 rounded-[21px] flex flex-1 justify-center px-8 items-center h-[68px] bg-[#FFCD18] active:bg-yellow-500 cursor-pointer"
        >
          <p className="text-[#3C3C3C] text-xl leading-[26px] text-center">
            تم
          </p>
        </div>
        <div className="lg:block hidden lg:w-1/2">
          <CancelBtn />
        </div>
      </div>
    </div>
  );
};

export default AddReport;
