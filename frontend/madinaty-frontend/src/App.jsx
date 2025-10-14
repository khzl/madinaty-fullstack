import { useState } from "react";
import Home from "./pages/Home";
import Fixed from "./pages/Fixed";
import Reports from "./pages/Reports";
import Header from "./components/Header";
import Navbar from "./components/Navbar";
import AddReport from "./pages/AddReport";
import Profile from "./pages/Profile";

function App() {
  return (
    <>
      <Header />
      <Navbar />
      <Home />
      {/* <Reports /> */}
      {/* <AddReport /> */}
      {/* <Profile /> */}
    </>
  );
}

export default App;
