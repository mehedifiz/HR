import React from "react";
import { FaUserCircle } from "react-icons/fa"; // Icon for profile
import SectionTitle from "../components/sectionTitle/SectionTitle";
import useUserData from "../hooks/useUserData";
import useAuth from "../hooks/useAuth";

function EmployeeBanner() {
  const { userData } = useUserData();
  const { user } = useAuth();
  const employeeName = user?.displayName || "Employee";
  const company = userData?.company_name || "Your Company";

  return (
    <div className="relative bg-gradient-to-r from-green-50 to-blue-50 text-gray-700 py-16 px-8 max-w-7xl mx-auto text-center rounded-lg  ">
      {/* Background Image */}
      <div className="absolute inset-0 bg-cover bg-center opacity-45" style={{ backgroundImage: `url('https://t4.ftcdn.net/jpg/04/67/93/01/360_F_467930159_UcfrOkjhFG436zoT9fSetYccBgpNkokp.jpg')` }}></div>

      {/* Content */}
      <div className="relative z-10">
        <FaUserCircle className="mx-auto text-gray-700 text-6xl mb-4" />
        <SectionTitle sectionTitle={`Welcome, ${employeeName}`} />
        <p className="text-2xl font-semibold my-2 text-gray-800">
          We’re glad to have you onboard, and we look forward to achieving great things together.
        </p>
        <p className="text-md mt-4 text-gray-600 opacity-90">
          <span className="font-semibold">Company:</span> {company}
        </p>
        <p className="text-lg mt-6 text-blue-600 font-semibold">
          Let’s make an impact today!
        </p>
      </div>
    </div>
  );
}

export default EmployeeBanner;
