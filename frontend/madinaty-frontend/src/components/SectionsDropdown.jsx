import { useState } from "react";

export default function CategoryDropdown({ setSection }) {
  const [selectedCategory, setSelectedCategory] = useState("الاقسام");
  const [open, setOpen] = useState(false);

  const categories = [
    "النظافة",
    "الطرق",
    "الكهرباء",
    "الماء",
    "الصحة",
    "الأمن",
  ];

  return (
    <div className="relative w-[136px] p-2 mt-6">
      <p className="opacity-60 mb-2">اختر القسم:</p>

      {/* Button */}
      <div
        onClick={() => setOpen(!open)}
        className="bg-gray-300 w-full border-[0.3px] border-gray-400 h-[50px] rounded-[15px] flex justify-center items-center cursor-pointer select-none"
      >
        <p className="opacity-50 text-xl">{selectedCategory}</p>
      </div>

      {/* Dropdown */}
      {open && (
        <div className="absolute z-50 top-[65px] w-full bg-white border border-gray-300 rounded-[15px] shadow-lg">
          {categories.map((cat, index) => (
            <div
              key={index}
              onClick={() => {
                setSelectedCategory(cat);
                setSection(cat);
                setOpen(false);
              }}
              className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-right"
            >
              {cat}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
