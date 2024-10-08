import { Avatar, Spinner } from "@material-tailwind/react";
import { Link, NavLink } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import useHR from "../../hooks/useHr";
import useEmployee from "../../hooks/useEmployee";
import useUserData from "../../hooks/useUserData";
import PrimaryButton from "../buttons/PrimaryButton";
// import MobileNav from "./mobileNav/MobileNav";
// import "./Navbar.css";

function Navbar() {
  const { user, loading, logOut } = useAuth();
  const { isHR } = useHR();
  const { isEmployee } = useEmployee();
  const { userData, isLoading } = useUserData();
  if (isLoading) {
    return (
      <div className="flex justify-center">
        <Spinner />
      </div>
    );
  }

  const navlinks = (
    <>
      {!user && (
        <>
          <NavLink
            to="/"
            className={({ isActive }) =>
              `flex items-center gap-2 px-5 py-2 font-bold font-roboto uppercase ${
                isActive ? "text-primary" : "hover:text-primary"
              }`
            }
          >
            Home
          </NavLink>
          <NavLink
            to="/join-as-employee"
            className={({ isActive }) =>
              `flex items-center gap-2 px-5 py-2 font-bold font-roboto uppercase ${
                isActive ? "text-primary" : "hover:text-primary"
              }`
            }
          >
            Join As Employee
          </NavLink>
          <NavLink
            to="/join-as-hr"
            className={({ isActive }) =>
              `flex items-center gap-2 px-5 py-2 font-bold font-roboto uppercase ${
                isActive ? "text-primary" : "hover:text-primary"
              }`
            }
          >
            Join As HR
          </NavLink>
        </>
      )}
      {user && isHR && (
        <>
          <NavLink
            to="/"
            className={({ isActive }) =>
              `flex items-center gap-2 px-5 py-2 font-bold font-roboto uppercase ${
                isActive ? "text-primary" : "hover:text-primary"
              }`
            }
          >
            Home
          </NavLink>
          <NavLink
            to="/asset-list"
            className={({ isActive }) =>
              `flex items-center gap-2 px-5 py-2 font-bold font-roboto uppercase ${
                isActive ? "text-primary" : "hover:text-primary"
              }`
            }
          >
            Asset List
          </NavLink>
          <NavLink
            to="/asset-add"
            className={({ isActive }) =>
              `flex items-center gap-2 px-5 py-2 font-bold font-roboto uppercase ${
                isActive ? "text-primary" : "hover:text-primary"
              }`
            }
          >
            Add Asset
          </NavLink>
          <NavLink
            to="/all-requests"
            className={({ isActive }) =>
              `flex items-center gap-2 px-5 py-2 font-bold font-roboto uppercase ${
                isActive ? "text-primary" : "hover:text-primary"
              }`
            }
          >
            All Requests
          </NavLink>
          <NavLink
            to="/employee-list"
            className={({ isActive }) =>
              `flex items-center gap-2 px-5 py-2 font-bold font-roboto uppercase ${
                isActive ? "text-primary" : "hover:text-primary"
              }`
            }
          >
            Employee Lists
          </NavLink>
          <NavLink
            to="/add-employee"
            className={({ isActive }) =>
              `flex items-center gap-2 px-5 py-2 font-bold font-roboto uppercase ${
                isActive ? "text-primary" : "hover:text-primary"
              }`
            }
          >
            Add Employee
          </NavLink>
          <NavLink
            to="/profile"
            className={({ isActive }) =>
              `flex items-center gap-2 px-5 py-2 font-bold font-roboto uppercase ${
                isActive ? "text-primary" : "hover:text-primary"
              }`
            }
          >
            Profile
          </NavLink>
        </>
      )}
      {user && isEmployee && (
        <>
          <NavLink
            to="/"
            className={({ isActive }) =>
              `flex items-center gap-2 px-5 py-2 font-bold font-roboto uppercase ${
                isActive ? "text-primary" : "hover:text-primary"
              }`
            }
          >
            Home
          </NavLink>
          <NavLink
            to="/my-assets"
            className={({ isActive }) =>
              `flex items-center gap-2 px-5 py-2 font-bold font-roboto uppercase ${
                isActive ? "text-primary" : "hover:text-primary"
              }`
            }
          >
            My Assets
          </NavLink>
          <NavLink
            to="/my-team"
            className={({ isActive }) =>
              `flex items-center gap-2 px-5 py-2 font-bold font-roboto uppercase ${
                isActive ? "text-primary" : "hover:text-primary"
              }`
            }
          >
            My Team
          </NavLink>
          <NavLink
            to="/request-for-asset"
            className={({ isActive }) =>
              `flex items-center gap-2 px-5 py-2 font-bold font-roboto uppercase ${
                isActive ? "text-primary" : "hover:text-primary"
              }`
            }
          >
            Request For Asset
          </NavLink>
          <NavLink
            to="/profile"
            className={({ isActive }) =>
              `flex items-center gap-2 px-5 py-2 font-bold font-roboto uppercase ${
                isActive ? "text-primary" : "hover:text-primary"
              }`
            }
          >
            Profile
          </NavLink>
        </>
      )}
    </>
  );

  return (
    <div className="shadow-lg h-20 flex items-center">
      <div className="navbar container mx-auto bg-base-100">
        <div className="navbar-start">
          <div className="dropdown">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost z-50 lg:hidden"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content z-50 mt-3 p-2 shadow bg-base-100 rounded-box w-52"
            >
              {navlinks}
            </ul>
          </div>
          {userData?.company_logo ? (
            <Link to="/">
              <img
                src={userData.company_logo}
                alt="Logo"
                className="h-12 w-12 rounded-full"
              />
            </Link>
          ) : (
            <Link to="/" className="logo">
              <h1 className="uppercase font-roboto font-extrabold lg:text-3xl md:text-2xl text-xl">Asset<span className="text-primary font-lato">H</span>ub</h1>
            </Link>
          )}
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal gap-3 px-1">{navlinks}</ul>
        </div>
        <div className="navbar-end gap-3">
          {user && (
            <>
              <div className="flex gap-1 items-center">
                <p>{user.displayName}</p>
                <Avatar
                className="w-10 h-10"
                  src={
                    user?.photoURL
                      ? user?.photoURL
                      : "https://upload.wikimedia.org/wikipedia/commons/thumb/2/24/Missing_avatar.svg/2048px-Missing_avatar.svg.png"
                  }
                  alt="avatar"
                />
              </div>
            </>
          )}

          {user ? (
            <button className="px-3 py-2 bg-primary text-white font-roboto font-bold" onClick={() => logOut()}>Logout</button>
          ) : (
            <Link className="px-5 py-2 font-roboto font-bold bg-primary text-white" to="/login">Login</Link>
          )}
        </div>
      </div>
    </div>
  );
}

export default Navbar;
