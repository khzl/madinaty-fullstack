import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const [form, setForm] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(form);
    navigate("/home");
  };

  return (
    <div className="min-h-screen  bg-[#efefef] flex flex-col items-center justify-center px-6">
      {/* <div className="absolute -bottom-[1700px] bg-[#ffffff] w-[2000px] h-[2000px] rounded-full left-1/2 -translate-x-1/2"></div> */}

      {/* Card */}
      <div className="bg-white w-full max-w-sm rounded-[25px] z-50 shadow-sm p-8 flex flex-col items-center">
        <h1 className="text-2xl font-bold mb-8 text-gray-800">تسجيل الدخول</h1>

        <form
          onSubmit={handleSubmit}
          className="w-full flex flex-col direction-rtl space-y-5"
        >
          {/* Email */}
          <div>
            <label
              id="cc"
              className="text-gray-700 text-sm mb-2 block text-right"
            >
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
            <label
              id="cc"
              className="text-gray-700  text-sm mb-2 block direction-rtl text-right"
            >
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

          {/* Submit */}
          <button
            type="submit"
            id="cc"
            className="bg-[#FFCD18] hover:scale-98 active:bg-[#ffba18]  duration-[0.2s] w-full rounded-[20px] cursor-pointer py-3 font-medium text-gray-800 text-lg active:scale-95 transition"
          >
            تسجيل الدخول
          </button>
        </form>

        {/* Footer */}
        <div id="cc" className="mt-6 text-gray-600 text-sm">
          ليس لديك حساب؟{" "}
          <span className="text-yellow-600 font-semibold cursor-pointer">
            <Link to="/register">إنشاء حساب</Link>
          </span>
        </div>
      </div>
    </div>
  );
};

export default Login;
