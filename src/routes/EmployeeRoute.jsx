import useEmployeeUser from "../hooks/useEmployeeUser";
import PropTypes from "prop-types";
import { Navigate, useLocation } from "react-router-dom";
import { Spinner } from "@material-tailwind/react";
import useAuth from "../hooks/useAuth";

function EmployeeRoute({ children }) {
    const { user, loading } = useAuth();
    const { isEmployee, isEmployeeLoading } = useEmployeeUser();
    const location = useLocation();
  
    if (loading || isEmployeeLoading) {
      return (
        <div className="flex justify-center mt-10">
          <Spinner />
        </div>
      );
    }
  
    if (user && isEmployee) {
      return children;
    }
  
    return <Navigate to="/" state={location.pathname}></Navigate>;
  }
  
  EmployeeRoute.propTypes = {
    children: PropTypes.node,
  };
  
  export default EmployeeRoute;