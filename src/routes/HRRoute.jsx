import PropTypes from "prop-types";
import useAuth from "../hooks/useAuth";
import useHR from "../hooks/useHr";
import { Navigate, useLocation } from "react-router-dom";
import { Spinner } from "@material-tailwind/react";

function HRRoute({ children }) {
    const { user, loading } = useAuth();
    const { isHR, isHRLoading } = useHR();
    const location = useLocation();
  
    if (loading || isHRLoading) {
      return (
        <div className="flex justify-center mt-10">
          <Spinner />
        </div>
      );
    }
  
    if (user && isHR) {
      return children;
    }
  
    return <Navigate to="/" state={location.pathname}></Navigate>;
  }
  
  
  
  export default HRRoute;