import { Outlet } from "react-router-dom";
import Footer from "../shared/Footer";
import Navbar from "../components/navbar/Navbar";
import TestimonialsSection from "../components/hr-home/ExtraSections";

const Root = () => {
  return (
    <div>
      <Navbar></Navbar>
      <div className="min-h-[calc(100vh-80px)]">
        <Outlet></Outlet>
      </div>


      <Footer></Footer>
    </div>
  );
};

export default Root;
