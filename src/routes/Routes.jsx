import { createBrowserRouter } from "react-router-dom";
import Root from "./../layouts/Root";
import Home from "../pages/home/Home";
import EmployeeSignup from "../pages/register/EmployeeSignup";
import HRManagerSignup from "../pages/register/HRManagerSignup";
import Login from "../pages/login/Login";
import Payment from "../pages/payment/Payment";
import MyAssets from './../pages/myassets/MyAssets';
import MyTeam from './../pages/myteam/MyTeam';
import RequestAsset from './../pages/requestasset/RequestAsset';
import Profile from './../pages/profile/Profile';
import AssetList from './../pages/assetlist/AssetList';
import AddAsset from './../pages/addasset/AddAsset';
import AllRequest from './../pages/allrequest/AllRequest';
import MyEmployee from './../pages/myemployee.jsx/MyEmployee';
import AddEmployee from './../pages/addemployee/AddEmployee';
import ErrorPage from "../pages/error/ErrorPage";
import UpdateAsset from '../pages/updateasset/UpdateAsset';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root></Root>,
    errorElement: <ErrorPage></ErrorPage>,
    children: [
      {
        path: "/",
        element: <Home></Home>,
      },
      {
        path: "/employee-signup",
        element: <EmployeeSignup></EmployeeSignup>,
      },
      {
        path: "/hr-signup",
        element: <HRManagerSignup></HRManagerSignup>,
      },
      {
        path: "/login",
        element: <Login></Login>,
      },
      // Employee Routes
      {
        path: "/my-assets",
        element: <MyAssets></MyAssets>,
      },
      {
        path: "/my-team",
        element: <MyTeam></MyTeam>,
      },
      {
        path: "/request-asset",
        element: <RequestAsset></RequestAsset>,
      },
      // HR Routes
      {
        path: "/asset-list",
        element: <AssetList></AssetList>,
      },
      {
        path: "/add-asset",
        element: <AddAsset></AddAsset>,
      },
      {
        path: "/all-request",
        element: <AllRequest></AllRequest>,
      },
      {
        path: "/my-employee",
        element: <MyEmployee></MyEmployee>,
      },
      {
        path: "/add-employee",
        element: <AddEmployee></AddEmployee>,
      },
      {
        path: "/update-asset/:id",
        element: <UpdateAsset></UpdateAsset>,
        // loader: ({params} ) => fetch(`https://asset-server-mu.vercel.app/asset/${params.id}`)
        loader: ({params} ) => fetch(`http://localhost:8000/asset/${params.id}`)
      },
      {
        path: "/payment",
        element: <Payment></Payment>,
      },
      {
        path: "/profile",
        element: <Profile></Profile>,
      },
    ],
  }
]);

export default router;
