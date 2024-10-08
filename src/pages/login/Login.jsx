import { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { AuthContext } from "../../providers/AuthProvider";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import SocialLogin from "../../components/SocialLogin";
import { toast } from "react-toastify";
import useRole from "../../hooks/useRole";

const Login = () => {
  const [role] = useRole();
  console.log(role);
  const {user, signIn } = useContext(AuthContext);
  console.log(user);
  const navigate = useNavigate();
  





  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [showPassword, setShowPassword] = useState(false);

  const onSubmit = (data) => {
    console.log(data);
    signIn(data.email, data.password)
      .then((result) => {
        console.log(result.user.email);
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Login Successfull.",
          showConfirmButton: false,
          timer: 1500,
        });
        navigate("/");
      })
      .catch((error) => {
        console.log(error);
        toast.error("Email/Password doesn't match! Please try again.");
      });
  };

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="min-h-screen flex items-center">
      <div className=" md:w-6/12 w-full mx-auto">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="max-w-md mx-auto p-6 border border-gray-300 rounded-lg bg-white shadow-md"
        >
          <div className="flex justify-center items-center font-bold font-roboto text-3xl py-8">
            <h1>Login</h1>
          </div>
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-gray-700 font-bold mb-2"
            >
              Email
            </label>
            <input
              id="email"
              type="email"
              {...register("email", { required: "Email is required" })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-300"
            />
            {errors.email && (
              <p className="text-red-500 text-xs mt-1">
                {errors.email.message}
              </p>
            )}
          </div>
          <div className="mb-6">
            <label
              htmlFor="password"
              className="block text-gray-700 font-bold mb-2"
            >
              Password
            </label>
            <div className="relative">
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                {...register("password", { required: "Password is required" })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-300"
              />
              <button
                type="button"
                onClick={handleClickShowPassword}
                className="absolute right-2 top-2 text-blue-500"
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>
            {errors.password && (
              <p className="text-red-500 text-xs mt-1">
                {errors.password.message}
              </p>
            )}
          </div>
          <div>
            <button
              type="submit"
              className="w-full py-2 px-4 bg-primary hover:bg-blue-600 text-white font-bold rounded-md focus:outline-none focus:ring focus:ring-blue-300"
            >
              Login
            </button>
          </div>
        </form>
        <div>
          <SocialLogin></SocialLogin>
        </div>
      </div>
    </div>
  );
};

export default Login;
