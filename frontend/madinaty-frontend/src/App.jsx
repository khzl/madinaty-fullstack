import { useState } from "react";
import Home from "./pages/Home";
import Fixed from "./pages/Fixed";
import Reports from "./pages/Reports";
import Header from "./components/Header";
import Navbar from "./components/Navbar";
import AddReport from "./pages/AddReport";
import Profile from "./pages/Profile";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import About from "./pages/about";
import EditReport from "./pages/EditReport";
import Done from "./components/Done";

function Layout() {
  const location = useLocation();

  const hideLayoutPaths = [
    "/add-report",
    "/profile",
    "/",
    "/register",
    "/edit-report",
  ];
  const hideLayout = hideLayoutPaths.includes(location.pathname);
  return (
    <>
      {!hideLayout && <Header />}
      {!hideLayout && <Navbar />}

      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route path="/home" element={<Home />} />
        <Route path="/edit-report" element={<EditReport />} />
        <Route path="/reports" element={<Reports />} />
        <Route path="/fixed" element={<Done />} />
        <Route path="/about" element={<About />} />
        <Route path="/add-report" element={<AddReport />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </>
  );
}

export default function App() {
  return (
    <Router>
      <Layout />
    </Router>
  );
}
