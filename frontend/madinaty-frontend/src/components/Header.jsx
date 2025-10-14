import { useEffect, useState } from "react";

export default function Header() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 0);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      className={`w-full h-[90px] sticky top-0 left-0 z-50 flex items-center justify-between px-4 bg-[#EEEEEE] transition-shadow duration-300 ${
        scrolled ? "shadow-md" : "shadow-none"
      }`}
    >
      <div className="bg-gray-400 w-[64px] h-[64px] rounded-full"></div>
      <h1 className="text-3xl">مدينتي</h1>
    </div>
  );
}
