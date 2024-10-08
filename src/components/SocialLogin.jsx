import { useContext } from "react";
import { AuthContext } from "../providers/AuthProvider";
import useAxiosPublic from "../hooks/useAxiosPublic";
import { useLocation, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { toast } from "react-toastify";

const SocialLogin = () => {
    const { googleLogin } = useContext(AuthContext);
    const axiosPublic = useAxiosPublic();
    const navigate = useNavigate();
    const location = useLocation();
    const from = location?.state?.from?.pathname || "/";

    const handleGoogleLogin = () => {
      googleLogin()
        .then((result) => {
          console.log(result.user);
          
          const userInfo = {
            name: result.user?.displayName,
            email: result.user?.email,
            isJoin: 'false',
            role: 'employee'
          };
          axiosPublic.post("/users", userInfo).then((res) => {
            console.log(res.data);
            toast.success("Login Successfull.")
            Swal.fire({
              position: 'center',
              icon: 'success',
              title: 'Login Successful.',
              timer: 1500,
            })
            // navigate(from, { replace: true });
            navigate('/')
          });
        })
        .catch((error) => {
          console.log(error);
        });
    };
    return (
      <div>
        <div className="flex items-center pt-4 space-x-1">
          <div className="flex-1 sm:w-16 "></div>
          <p className="px-3 text-base font-bold font-roboto ">
            Login with Google
          </p>
          <div className="flex-1 sm:w-16"></div>
        </div>
        <div className="flex justify-center space-x-4">
          <button
            onClick={handleGoogleLogin}
            aria-label="Log in with Google"
            className="p-3 rounded-sm"
          >
            <img
              width="24"
              height="24"
              src="https://img.icons8.com/fluency/24/google-logo.png"
              alt="google-logo"
            />
          </button>
        </div>
      </div>
    );
  };
  
  export default SocialLogin;