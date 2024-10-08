import { Link, NavLink } from "react-router-dom";
import PrimaryButton from "../../buttons/PrimaryButton";
import { Drawer, IconButton } from "@material-tailwind/react";
import { RxHamburgerMenu } from "react-icons/rx";
import React from "react";
import useUserData from "../../../hooks/useUserData";
import useEmployee from "../../../hooks/useEmployee";
import useHR from "../../../hooks/useHr";
import useAuth from "../../../hooks/useAuth";
import "./MobileNav.css";

function MobileNav() {
    const { user, logOut } = useAuth();
    const { isHR } = useHR();
    const { isEmployee } = useEmployee();
    const { userData } = useUserData();
    const [openRight, setOpenRight] = React.useState(false);
    const openDrawerRight = () => setOpenRight(true);
    const closeDrawerRight = () => setOpenRight(false);
  
    return (
      <div className="block xl:hidden">
        <div>
          <span onClick={openDrawerRight} className="hamburger-icon">
            <RxHamburgerMenu />
          </span>
        </div>
        <Drawer
          placement="right"
          open={openRight}
          onClose={closeDrawerRight}
          className="p-4"
        >
          <div className="text-right">
            <IconButton
              variant="text"
              color="blue-gray"
              onClick={closeDrawerRight}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
                className="h-7 w-7"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </IconButton>
          </div>
          <div className="mb-2">
            {user && <h2 className="mb-2">Name : {user?.displayName}</h2>}
            <NavLink
              to="/"
              className={({ isActive }) =>
                isActive ? "active-nav-link" : "default-nav-link"
              }
            >
              Home
            </NavLink>
          </div>
          <div className="mb-2">
            {!user && (
              <>
                <div className="mb-3">
                  <NavLink
                    to="/join-as-employee"
                    className={({ isActive }) =>
                      isActive ? "active-nav-link" : "default-nav-link"
                    }
                  >
                    Join as Employee
                  </NavLink>
                </div>
                <div className="mb-0">
                  <NavLink
                    to="/join-as-hr"
                    className={({ isActive }) =>
                      isActive ? "active-nav-link" : "default-nav-link"
                    }
                  >
                    Join as HR Manager
                  </NavLink>
                </div>
              </>
            )}
            {user && isHR && (
              <>
                <div className="mb-3">
                  <NavLink
                    to="/asset-add"
                    className={({ isActive }) =>
                      isActive ? "active-nav-link" : "default-nav-link"
                    }
                  >
                    Add an Asset
                  </NavLink>
                </div>
                <div className="mb-3">
                  <NavLink
                    to="/asset-list"
                    className={({ isActive }) =>
                      isActive ? "active-nav-link" : "default-nav-link"
                    }
                  >
                    Asset List
                  </NavLink>
                </div>
                <div className="mb-3">
                  <NavLink
                    to="/all-requests"
                    className={({ isActive }) =>
                      isActive ? "active-nav-link" : "default-nav-link"
                    }
                  >
                    All Requests
                  </NavLink>
                </div>
                <div className="mb-3">
                  <NavLink
                    to="/add-employee"
                    className={({ isActive }) =>
                      isActive ? "active-nav-link" : "default-nav-link"
                    }
                  >
                    Add an Employee
                  </NavLink>
                </div>
                <div className="mb-0">
                  <NavLink
                    to="/employee-list"
                    className={({ isActive }) =>
                      isActive ? "active-nav-link" : "default-nav-link"
                    }
                  >
                    My Employee List
                  </NavLink>
                </div>
              </>
            )}
            {user && isEmployee && userData?.company_name && (
              <>
                <div className="mb-3">
                  <NavLink
                    to="/request-for-asset"
                    className={({ isActive }) =>
                      isActive ? "active-nav-link" : "default-nav-link"
                    }
                  >
                    Request for an Asset
                  </NavLink>
                </div>
                <div className="mb-3">
                  <NavLink
                    to="/my-assets"
                    className={({ isActive }) =>
                      isActive ? "active-nav-link" : "default-nav-link"
                    }
                  >
                    My Assets
                  </NavLink>
                </div>
                <div className="mb-3">
                  <NavLink
                    to="/my-team"
                    className={({ isActive }) =>
                      isActive ? "active-nav-link" : "default-nav-link"
                    }
                  >
                    My Team
                  </NavLink>
                </div>
              </>
            )}
          </div>
          <div className="mb-0">
            {!user && (
              <Link to="/login">
                <PrimaryButton
                  buttonType={"button"}
                  buttonTextColor={"text-white"}
                  buttonBGColor={"bg-green-700"}
                  buttonName={"Login"}
                />
              </Link>
            )}
  
            {user && (
              <>
                <div className="mb-3">
                  <NavLink
                    to="/profile"
                    className={({ isActive }) =>
                      isActive ? "active-nav-link" : "default-nav-link"
                    }
                  >
                    Profile
                  </NavLink>
                </div>
                <div>
                  <span onClick={() => logOut()}>
                    <PrimaryButton
                      buttonType={"button"}
                      buttonTextColor={"text-white"}
                      buttonBGColor={"bg-green-700"}
                      buttonName={"Logout"}
                    />
                  </span>
                </div>
              </>
            )}
          </div>
        </Drawer>
      </div>
    );
  }
  
  export default MobileNav;