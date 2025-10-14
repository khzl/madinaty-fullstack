import Header from "../components/Header";
import Navbar from "../components/Navbar";
import ReportBtn from "../components/ReportBtn";
import Sections from "../components/Sections";

const Home = () => {
  return (
    <div>
      <div className=" lg:hidden">
        <ReportBtn />
      </div>
      <Sections />
    </div>
  );
};

export default Home;
