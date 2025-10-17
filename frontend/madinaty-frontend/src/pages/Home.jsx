import { Link } from "react-router-dom";
import Header from "../components/Header";
import Navbar from "../components/Navbar";
import ReportBtn from "../components/ReportBtn";
import Sections from "../components/Sections";
import { useState } from "react";

const Home = () => {
  return (
    <div className="lg:relative">
      <Link to="/add-report" className=" lg:hidden">
        <ReportBtn />
      </Link>

      <Sections />
    </div>
  );
};

export default Home;
