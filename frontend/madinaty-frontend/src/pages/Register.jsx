import { useState } from "react";
import { Link } from "react-router-dom";

const Register = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (form.password !== form.confirmPassword) {
      alert("كلمتا المرور غير متطابقتين");
      return;
    }
    console.log(form);
  };

  return (
    <div className="min-h-screen bg-[#efefef] flex flex-col items-center justify-center px-6">
      {/* Card */}
      <div className="bg-white w-full max-w-sm rounded-[25px] shadow-sm p-8 flex flex-col items-center">
        <h1 className="text-2xl font-bold mb-8 text-gray-800">إنشاء حساب</h1>

        <form
          onSubmit={handleSubmit}
          id="cc"
          className="w-full flex direction-rtl flex-col space-y-5"
        >
          {/* Name */}
          <div>
            <label className="text-gray-700 text-sm mb-2 block text-right">
              اسم المستخدم:
            </label>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="اسم المستخدم"
              className="w-full rounded-[15px] border border-gray-300 px-4 py-3 text-right focus:outline-none focus:ring-2 focus:ring-yellow-400"
              required
            />
          </div>

          {/* Email */}
          <div>
            <label className="text-gray-700 text-sm mb-2 block text-right">
              البريد الإلكتروني:
            </label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="example@email.com"
              className="w-full rounded-[15px] border border-gray-300 px-4 py-3 text-right focus:outline-none focus:ring-2 focus:ring-yellow-400"
              required
            />
          </div>

          {/* Password */}
          <div>
            <label className="text-gray-700 text-sm mb-2 block text-right">
              كلمة المرور:
            </label>
            <input
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              placeholder="••••••••"
              className="w-full rounded-[15px] border border-gray-300 px-4 py-3 text-right focus:outline-none focus:ring-2 focus:ring-yellow-400"
              required
            />
          </div>

          {/* Confirm Password */}
          <div>
            <label className="text-gray-700 text-sm mb-2 block text-right">
              تأكيد كلمة المرور:
            </label>
            <input
              type="password"
              name="confirmPassword"
              value={form.confirmPassword}
              onChange={handleChange}
              placeholder="••••••••"
              className="w-full rounded-[15px] border border-gray-300 px-4 py-3 text-right focus:outline-none focus:ring-2 focus:ring-yellow-400"
              required
            />
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="bg-[#FFCD18] hover:scale-98 active:bg-[#ffba18]  duration-[0.2s] w-full rounded-[20px] cursor-pointer py-3 font-medium text-gray-800 text-lg active:scale-95 transition"
          >
            إنشاء حساب
          </button>
        </form>

        {/* Footer */}
        <div id="cc" className="mt-6 text-gray-600 text-sm">
          لديك حساب؟{" "}
          <span className="text-yellow-600 font-semibold cursor-pointer">
            <Link to="/">تسجيل الدخول</Link>
          </span>
        </div>
      </div>
    </div>
  );
};

export default Register;
