import { Link, NavLink, useNavigate } from "react-router-dom";
import { HiOutlineMenu } from "react-icons/hi";
import { useContext } from "react";
import { AuthContext } from "./../providers/AuthProvider";
import { toast } from "react-toastify";
import useRole from "../hooks/useRole";
import { FaUser } from "react-icons/fa";
import useCurrentUser from "../hooks/useCurrentUser";
import { ImProfile } from "react-icons/im";
import { IoLogOutOutline } from "react-icons/io5";
import { FiLogOut } from "react-icons/fi";

const Navbar = () => {
  const [currentUser] = useCurrentUser();
  console.log(currentUser);
  const { user, logOut } = useContext(AuthContext);
  const [role] = useRole();
  console.log(role);
  const navigate = useNavigate();
  const handleLogout = () => {
    logOut()
      .then((result) => {
        console.log(result);
        toast.success("Logout Successful.");
        navigate("/");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const navLinks = (
    <>
      {!user && (
        <>
          <NavLink
            to="/"
            className={({ isActive }) =>
              `flex items-center gap-2 py-1 font-bold font-roboto ${
                isActive
                  ? "border-b-2 border-blue-700"
                  : "hover:border-b-2 border-b-2 border-b-transparent hover:border-b-transparent"
              }`
            }
          >
            Home
          </NavLink>
          <NavLink
            to="/employee-signup"
            className={({ isActive }) =>
              `flex items-center gap-2 py-1 font-bold font-roboto ${
                isActive
                  ? "border-b-2 border-blue-700"
                  : "hover:border-b-2 border-b-2 border-b-transparent hover:border-b-transparent"
              }`
            }
          >
            Join As Employee
          </NavLink>
          <NavLink
            to="/hr-signup"
            className={({ isActive }) =>
              `flex items-center gap-2 py-1 font-bold font-roboto ${
                isActive
                  ? "border-b-2 border-blue-700"
                  : "hover:border-b-2 border-b-2 border-b-transparent hover:border-b-transparent"
              }`
            }
          >
            Join As HR
          </NavLink>
        </>
      )}
      {user && currentUser.role === "employee" && (
        <>
          <NavLink
            to="/"
            className={({ isActive }) =>
              `flex items-center gap-2 py-1 font-bold font-roboto ${
                isActive
                  ? "border-b-2 border-blue-700"
                  : "hover:border-b-2 border-b-2 border-b-transparent hover:border-b-transparent"
              }`
            }
          >
            Home
          </NavLink>
          <NavLink
            to="/my-assets"
            className={({ isActive }) =>
              `flex items-center gap-2 py-1 font-bold font-roboto ${
                isActive
                  ? "border-b-2 border-blue-700"
                  : "hover:border-b-2 border-b-2 border-b-transparent hover:border-b-transparent"
              }`
            }
          >
            My Assets
          </NavLink>
          <NavLink
            to="/my-team"
            className={({ isActive }) =>
              `flex items-center gap-2 py-1 font-bold font-roboto ${
                isActive
                  ? "border-b-2 border-blue-700"
                  : "hover:border-b-2 border-b-2 border-b-transparent hover:border-b-transparent"
              }`
            }
          >
            My Team
          </NavLink>
          <NavLink
            to="/request-asset"
            className={({ isActive }) =>
              `flex items-center gap-2 py-1 font-bold font-roboto ${
                isActive
                  ? "border-b-2 border-blue-700"
                  : "hover:border-b-2 border-b-2 border-b-transparent hover:border-b-transparent"
              }`
            }
          >
            Request An Asset
          </NavLink>
        </>
      )}
      {user && currentUser.role === "hr" && (
        <>
          <NavLink
            to="/"
            className={({ isActive }) =>
              `flex items-center gap-2 py-1 font-bold font-roboto ${
                isActive
                  ? "border-b-2 border-blue-700"
                  : "hover:border-b-2 border-b-2 border-b-transparent hover:border-b-transparent"
              }`
            }
          >
            Home
          </NavLink>
          <NavLink
            to="/asset-list"
            className={({ isActive }) =>
              `flex items-center gap-2 py-1 font-bold font-roboto ${
                isActive
                  ? "border-b-2 border-blue-700"
                  : "hover:border-b-2 border-b-2 border-b-transparent hover:border-b-transparent"
              }`
            }
          >
            Asset List
          </NavLink>
          <NavLink
            to="/add-asset"
            className={({ isActive }) =>
              `flex items-center gap-2 py-1 font-bold font-roboto ${
                isActive
                  ? "border-b-2 border-blue-700"
                  : "hover:border-b-2 border-b-2 border-b-transparent hover:border-b-transparent"
              }`
            }
          >
            Add Asset
          </NavLink>
          <NavLink
            to="/all-request"
            className={({ isActive }) =>
              `flex items-center gap-2 py-1 font-bold font-roboto ${
                isActive
                  ? "border-b-2 border-blue-700"
                  : "hover:border-b-2 border-b-2 border-b-transparent hover:border-b-transparent"
              }`
            }
          >
            All Request
          </NavLink>
          <NavLink
            to="/my-employee"
            className={({ isActive }) =>
              `flex items-center gap-2 py-1 font-bold font-roboto ${
                isActive
                  ? "border-b-2 border-blue-700"
                  : "hover:border-b-2 border-b-2 border-b-transparent hover:border-b-transparent"
              }`
            }
          >
            My Employee
          </NavLink>

          <NavLink
            to="/add-employee"
            className={({ isActive }) =>
              `flex items-center gap-2 py-1 font-bold font-roboto ${
                isActive
                  ? "border-b-2 border-blue-700"
                  : "hover:border-b-2 border-b-2 border-b-transparent hover:border-b-transparent"
              }`
            }
          >
            Add Employee
          </NavLink>
        </>
      )}
    </>
  );

  return (
    <div className="min-h-[80px] flex items-center shadow-md">
      <div className="navbar md:px-0 px-2 container mx-auto">
        <div className="navbar-start gap-5">
          <div className="dropdown dropdown-bottom lg:hidden">
            <div tabIndex={0} role="button" className="">
              <HiOutlineMenu className="text-2xl" />
            </div>
            <ul
              tabIndex={0}
              className="dropdown-content z-50 menu mt-5 p-2 shadow bg-base-100 rounded-box w-52 uppercase font-roboto"
            >
              {navLinks}
            </ul>
          </div>
          <Link to="/">
            <div>
              {!user && (
                <h1 className="font-extrabold font-roboto lg:text-4xl md:text-3xl text-xl">
                  <span className="text-primary">K</span>eepo
                </h1>
              )}
              {user && currentUser.role === "hr" && (
                <img
                  className="w-10 h-10 rounded-full"
                  src={currentUser?.logo}
                  alt="Logo"
                />
              )}
              {user && currentUser.role === "employee" && (
                <h1 className="font-extrabold font-roboto lg:text-4xl md:text-3xl text-xl">
                  <span className="text-primary">K</span>eepo
                </h1>
              )}
              {user && currentUser.role === "employee" && currentUser.logo && (
                <img
                  className="w-10 h-10 rounded-full"
                  src={currentUser?.logo}
                  alt="Logo"
                />
              )}
            </div>
          </Link>
          {/* <Link to="/">
            <div className="">
              <h1 className="font-extrabold font-roboto lg:text-4xl md:text-3xl text-xl">
                <span className="text-primary">K</span>eepo
              </h1>
            </div>
          </Link> */}
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal gap-8 px-1 uppercase font-bold font-roboto">
            {navLinks}
          </ul>
        </div>
        <div className="navbar-end gap-5">
          {user ? (
            <div className="dropdown dropdown-bottom dropdown-end dropdown-hover">
              <div
                tabIndex={0}
                role="button"
                className="tooltip tooltip-left"
                data-tip={user?.displayName}
              >
                <img
                  className="w-10 h-10 rounded-full"
                  src={user?.photoURL}
                  alt=""
                />
              </div>
              <ul
                tabIndex={0}
                className="dropdown-content z-50 menu p-2 shadow bg-base-100 rounded-box w-52"
              >
                <NavLink
                  to="/profile"
                  className={({ isActive }) =>
                    `flex items-center gap-2 px-3 py-2 font-bold font-roboto ${
                      isActive ? " bg-gray-200" : " hover:bg-gray-100"
                    }`
                  }
                >
                  <ImProfile />
                  My Profile
                </NavLink>
                <NavLink
                  onClick={handleLogout}
                  className="flex items-center gap-2 px-3 py-2 font-bold font-roboto hover:bg-gray-100"
                >
                  <FiLogOut />
                  Logout
                </NavLink>
              </ul>
            </div>
          ) : (
            <div>
              <Link to="/login">
                <button className="font-inter px-5 py-2 border bg-primary text-white font-roboto font-bold  ">
                  Login
                </button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
