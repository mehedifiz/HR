import { createBrowserRouter } from "react-router-dom";
import Profile from "../pages/profile/Profile";
import PrivateRoute from "./PrivateRoute";
import Root from "../layouts/Root";
import ErrorPage from "../pages/error/ErrorPage";
import JoinAsEmployee from "../pages/register/JoinAsEmployee";
import JoinAsHR from "../pages/register/JoinAsHR";
import HRRoute from "./HRRoute";
import EmployeeRoute from "./EmployeeRoute";
import Home from "../pages/home/Home";
import Login from "../pages/login/Login";
import RequestForAsset from "../pages/employee/RequestForAsset";
import AddEmployee from "../pages/hr/AddEmployee";
import EmployeeList from "../pages/hr/EmployeeList";
import AllRequests from "../pages/hr/AllRequests";
import EditAsset from "../pages/hr/EditAsset";
import AssetAdd from "../pages/hr/AssetAdd";
import AssetList from "../pages/hr/AssetList";
import IncreaseLimit from "../pages/hr/IncreaseLimit";
import Payment from "../pages/hr/Payment";
import MyTeam from "../pages/employee/MyTeam";
import MyAssets from "../pages/employee/MyAssets";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Root></Root>,
    errorElement: <ErrorPage></ErrorPage>,
    children: [
      {
        index: true,
        element: <Home></Home>,
      },
      {
        path: "/join-as-employee",
        element: <JoinAsEmployee />,
      },
      {
        path: "/join-as-hr",
        element: <JoinAsHR />,
      },
      // Employee
      {
        path: "/my-assets",
        element: (
          <PrivateRoute>
            <EmployeeRoute>
              <MyAssets />
            </EmployeeRoute>
          </PrivateRoute>
        ),
      },
      {
        path: "/my-team",
        element: (
          <PrivateRoute>
            <EmployeeRoute>
              <MyTeam />
            </EmployeeRoute>
          </PrivateRoute>
        ),
      },
      {
        path: "/request-for-asset",
        element: (
          <PrivateRoute>
            <EmployeeRoute>
              <RequestForAsset />
            </EmployeeRoute>
          </PrivateRoute>
        ),
      },
      // Employee

      // HR Manager
      {
        path: "/payment",
        element: (
          <PrivateRoute>
            <HRRoute>
              <Payment />
            </HRRoute>
          </PrivateRoute>
        ),
      },
      {
        path: "/increase",
        element: (
          <PrivateRoute>
            <HRRoute>
              <IncreaseLimit />
            </HRRoute>
          </PrivateRoute>
        ),
      },
      {
        path: "/asset-list",
        element: (
          <PrivateRoute>
            <HRRoute>
              <AssetList />
            </HRRoute>
          </PrivateRoute>
        ),
      },
      {
        path: "/asset-add",
        element: (
          <PrivateRoute>
            <HRRoute>
              <AssetAdd />
            </HRRoute>
          </PrivateRoute>
        ),
      },
      {
        path: "edit-asset/:id",
        element: (
          <PrivateRoute>
            <HRRoute>
              <EditAsset />
            </HRRoute>
          </PrivateRoute>
        ),
        loader: ({ params }) => {
          const accessToken = localStorage.getItem("access-token");
          return fetch(`https://assetmanage-server.onrender.com/assets/${params.id}`, {
            credentials: "include",
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          });
        },
      },
      {
        path: "/all-requests",
        element: (
          <PrivateRoute>
            <HRRoute>
              <AllRequests />
            </HRRoute>
          </PrivateRoute>
        ),
      },
      {
        path: "/employee-list",
        element: (
          <PrivateRoute>
            <HRRoute>
              <EmployeeList />
            </HRRoute>
          </PrivateRoute>
        ),
      },
      {
        path: "/add-employee",
        element: (
          <PrivateRoute>
            <HRRoute>
              <AddEmployee /> 
            </HRRoute>
          </PrivateRoute>
        ),
      },
      // HR Manager

      {
        path: "/profile",
        element: (
          <PrivateRoute>
            <Profile></Profile>
          </PrivateRoute>
        ),
      },
      {
        path: "/login",
        element: <Login></Login>,
      },
    ],
  },
]);