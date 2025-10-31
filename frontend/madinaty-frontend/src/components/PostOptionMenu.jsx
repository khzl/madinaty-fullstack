import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../style/dropDown.css";

export default function OptionsMenu({ report, isAdmin = true }) {
  const [open, setOpen] = useState(false);
  const menuRef = useRef();
  const navigate = useNavigate();

  useEffect(() => {
    function handleClickOutside(event) {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleComplete = () => {
    const reports = JSON.parse(localStorage.getItem("reports")) || [];
    const updatedReports = reports.map((r) =>
      r.id === report.id ? { ...r, completed: true } : r
    );
    localStorage.setItem("reports", JSON.stringify(updatedReports));
    alert("تم إنجازه ✅");
    setOpen(false);
  };

  const handleDelete = () => {
    const reports = JSON.parse(localStorage.getItem("reports")) || [];
    const filteredReports = reports.filter((r) => r.id !== report.id);
    localStorage.setItem("reports", JSON.stringify(filteredReports));
    alert("تم حذف البلاغ 🗑️");
    setOpen(false);
    window.location.reload(); // quick refresh to reflect change
  };

  const handleEdit = () => {
    navigate("/edit-report", { state: { id: report.id } });
    setOpen(false);
  };

  return (
    <div className="options-menu" ref={menuRef}>
      <button className="menu-button" onClick={() => setOpen(!open)}>
        ⋮
      </button>

      {open && (
        <div className="dropdown">
          {isAdmin && <button onClick={handleComplete}>تم إنجازه</button>}

          <button onClick={handleEdit}>تعديل</button>

          <button onClick={handleDelete} className="text-red-500">
            حذف
          </button>
        </div>
      )}
    </div>
  );
}
