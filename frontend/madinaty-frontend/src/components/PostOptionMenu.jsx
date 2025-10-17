import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import "../style/dropDown.css";

export default function OptionsMenu() {
  const [open, setOpen] = useState(false);
  const menuRef = useRef();

  useEffect(() => {
    function handleClickOutside(event) {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="options-menu" ref={menuRef}>
      <button className="menu-button" onClick={() => setOpen(!open)}>
        ⋮
      </button>

      {open && (
        <div className="dropdown">
          <Link to="/learned" onClick={() => setOpen(false)}>
            تعديل{" "}
          </Link>
          <a href="https://api-requests-practice.vercel.app">حذف</a>
        </div>
      )}
    </div>
  );
}
