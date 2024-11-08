import { useState } from "react";
import { Avatar, Spinner } from "@material-tailwind/react";
import { Link, NavLink } from "react-router-dom";
import PrimaryButton from "../buttons/PrimaryButton";
import useAuth from "../../hooks/useAuth";
import useHR from "../../hooks/useHr";
import useEmployee from "../../hooks/useEmployee";
import useUserData from "../../hooks/useUserData";

function Navbar() {
  const { user, loading, logOut } = useAuth();
  const { isHR } = useHR();
  const { isEmployee } = useEmployee();
  const { userData, isLoading } = useUserData();
  
  // State for mobile menu toggle
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  if (isLoading) {
    return (
      <div className="flex justify-center py-5">
        <Spinner color="blue" />
      </div>
    );
  }

  const navlinks = (
    <>
      {!user && (
        <>
          <NavLink to="/" className={({ isActive }) => `default-nav-link ${isActive ? "active-nav-link" : ""}`}>Home</NavLink>
          <NavLink to="/join-as-employee" className={({ isActive }) => `default-nav-link ${isActive ? "active-nav-link" : ""}`}>Join As Employee</NavLink>
          <NavLink to="/join-as-hr" className={({ isActive }) => `default-nav-link ${isActive ? "active-nav-link" : ""}`}>Join As HR</NavLink>
        </>
      )}
      {user && isHR && (
        <>
          <NavLink to="/" className={({ isActive }) => `default-nav-link ${isActive ? "active-nav-link" : ""}`}>Home</NavLink>
          <NavLink to="/asset-list" className={({ isActive }) => `default-nav-link ${isActive ? "active-nav-link" : ""}`}>Asset List</NavLink>
          <NavLink to="/asset-add" className={({ isActive }) => `default-nav-link ${isActive ? "active-nav-link" : ""}`}>Add Asset</NavLink>
          <NavLink to="/all-requests" className={({ isActive }) => `default-nav-link ${isActive ? "active-nav-link" : ""}`}>All Requests</NavLink>
          <NavLink to="/employee-list" className={({ isActive }) => `default-nav-link ${isActive ? "active-nav-link" : ""}`}>Employee Lists</NavLink>
          <NavLink to="/add-employee" className={({ isActive }) => `default-nav-link ${isActive ? "active-nav-link" : ""}`}>Add Employee</NavLink>
          <NavLink to="/profile" className={({ isActive }) => `default-nav-link ${isActive ? "active-nav-link" : ""}`}>Profile</NavLink>
        </>
      )}
      {user && isEmployee && (
        <>
          <NavLink to="/" className={({ isActive }) => `default-nav-link ${isActive ? "active-nav-link" : ""}`}>Home</NavLink>
          <NavLink to="/my-assets" className={({ isActive }) => `default-nav-link ${isActive ? "active-nav-link" : ""}`}>My Assets</NavLink>
          <NavLink to="/my-team" className={({ isActive }) => `default-nav-link ${isActive ? "active-nav-link" : ""}`}>My Team</NavLink>
          <NavLink to="/request-for-asset" className={({ isActive }) => `default-nav-link ${isActive ? "active-nav-link" : ""}`}>Request For Asset</NavLink>
          <NavLink to="/profile" className={({ isActive }) => `default-nav-link ${isActive ? "active-nav-link" : ""}`}>Profile</NavLink>
        </>
      )}
    </>
  );

  return (
    <div className="bg-blue-700 shadow-lg h-16 flex items-center text-white">
      <div className="container mx-auto px-6 flex justify-between items-center">
        {/* Mobile Hamburger Icon and Logo Section */}
        <div className="flex items-center gap-4">
          {/* Mobile Hamburger Icon */}
          <div className="lg:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-white focus:outline-none"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-8 6h8" />
              </svg>
            </button>
          </div>

          {/* Logo */}
          <Link to="/" className="logo flex items-center">
            {userData?.company_logo ? (
              <img src={userData.company_logo} alt="Logo" className="h-10 w-10 rounded-full" />
            ) : (
              <h1 className="text-2xl font-semibold">Asset<span className="text-green-400">Manage</span></h1>
            )}
          </Link>
        </div>

        {/* Desktop NavLinks */}
        <div className="hidden lg:flex gap-6">
          {navlinks}
        </div>

        {/* Mobile Nav Links Dropdown */}
        {isMenuOpen && (
          <div className="absolute top-16 left-0 w-full bg-blue-700 text-white z-50 lg:hidden">
            <ul className="flex flex-col items-center gap-4 py-4">
              {navlinks}
            </ul>
          </div>
        )}

        {/* User Profile and Login/Logout */}
        <div className="navbar-end flex items-center gap-4">
          {user ? (
            <div className="flex items-center gap-2">
              <span className="font-medium">{user.displayName}</span>
              <Avatar
                className="w-10 h-10 border-2 border-green-400"
                src={
                  user.photoURL ||
                  "https://upload.wikimedia.org/wikipedia/commons/thumb/2/24/Missing_avatar.svg/2048px-Missing_avatar.svg.png"
                }
                alt="avatar"
              />
              <button onClick={logOut} className="px-4 py-1 bg-green-500 text-white rounded-lg hover:bg-green-600 transition">
                Logout
              </button>
            </div>
          ) : (
            <Link to="/login" className="px-4 py-1 bg-green-500 text-white rounded-lg hover:bg-green-600 transition">
              Login
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}

export default Navbar;
