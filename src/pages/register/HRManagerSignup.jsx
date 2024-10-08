import { useForm } from "react-hook-form";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import { useContext, useState } from "react";
import { AuthContext } from "../../providers/AuthProvider";
import Swal from "sweetalert2";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;

const HRManagerSignup = () => {
  const { createUser, updateUserProfile } = useContext(AuthContext);
  const axiosPublic = useAxiosPublic();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    console.log(data);
    console.log(data.companyLogo[0]);
    const imageFileLogo = { image: data.companyLogo[0] };
    const resLogo = await axiosPublic.post(image_hosting_api, imageFileLogo, {
      headers: {
        "content-Type": "multipart/form-data",
      },
    });
    const imageFileProfile = { image: data.profile[0] };
    const resProfile = await axiosPublic.post(
      image_hosting_api,
      imageFileProfile,
      {
        headers: {
          "content-Type": "multipart/form-data",
        },
      }
    );
    console.log(resLogo.data.data.display_url);
    if (resLogo.data.success && resProfile.data.success) {
      createUser(data.email, data.password)
        .then((result) => {
          const loggedUser = result.user;
          console.log(loggedUser);
          Swal.fire({
            position: "center",
            icon: "success",
            title: "Registration Successfull.",
            showConfirmButton: false,
            timer: 1500,
          });
          updateUserProfile(data.fullName, resProfile.data.data.display_url)
            .then(() => {
              console.log("User profile updated.");
              const packagePrice = parseInt(data.package);
              const userInfo = {
                name: data.fullName,
                photo: resProfile.data.data.display_url,
                email: data.email,
                logo: resLogo.data.data.display_url,
                companyName: data.companyName,
                dateOfBirth: data.dateOfBirth,
                packagePrice: parseInt(data.package),
                members_limit:
                  packagePrice === 5 ? 5 : packagePrice === 8 ? 10 : 20,
                payment_status: "pending",
                role: "hr",
              };
              axiosPublic.post("/users", userInfo).then((res) => {
                if (res.data.insertedId) {
                  console.log("User added to database.");
                  reset();
                  Swal.fire({
                    position: "center",
                    icon: "success",
                    title: "User Created Successfully!.",
                    showConfirmButton: false,
                    timer: 1500,
                  });
                  navigate("/payment");
                }
              });
            })
            .catch((error) => {
              console.log(error);
            });
        })
        .then((error) => {
          console.log(error);
        });
    }
  };

  return (
    <div className="py-8 xl:w-4/12 lg:w-5/12 md:w-6/12 w-full mx-auto">
      <form
        className="p-5 space-y-2 font-roboto border"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="flex items-center mb-8 justify-center font-bold font-roboto text-3xl">
          <h2>Join as HR Manager</h2>
        </div>
        <div className="flex flex-col gap-1">
          <label>
            <strong>Full Name</strong>
          </label>
          <input
            className="py-2 px-2 border focus:outline-none"
            placeholder="Full Name"
            type="text"
            {...register("fullName", { required: "Full Name is required" })}
          />
          {errors.fullName && (
            <p className="text-red-500 text-xs">{errors.fullName.message}</p>
          )}
        </div>
        <div className="flex flex-col gap-1">
          <label>
            <strong>Upload Your Photo</strong>
          </label>
          <input
            type="file"
            {...register("profile", {
              required: "Profile photo is required",
            })}
          />
          {errors.profile && (
            <p className="text-red-500 text-xs">{errors.profile.message}</p>
          )}
        </div>
        <div className="flex flex-col gap-1">
          <label>
            <strong>Company Name</strong>
          </label>
          <input
            className="py-2 px-2 border focus:outline-none"
            placeholder="Company Name"
            type="text"
            {...register("companyName", {
              required: "Company Name is required",
            })}
          />
          {errors.companyName && (
            <p className="text-red-500 text-xs">{errors.companyName.message}</p>
          )}
        </div>
        <div className="flex flex-col gap-1">
          <label>
            <strong>Upload Company Logo</strong>
          </label>
          <input
            type="file"
            {...register("companyLogo", {
              required: "Company Logo is required",
            })}
          />
          {errors.companyLogo && (
            <p className="text-red-500 text-xs">{errors.companyLogo.message}</p>
          )}
        </div>
        <div className="flex flex-col gap-1">
          <label>
            <strong>Email</strong>
          </label>
          <input
            className="py-2 px-2 border focus:outline-none"
            placeholder="Email"
            type="email"
            {...register("email", { required: "Email is required" })}
          />
          {errors.email && (
            <p className="text-red-500 text-xs">{errors.email.message}</p>
          )}
        </div>
        <div className="flex flex-col gap-1">
          <label>
            <strong>Password</strong>
          </label>
          <input
            className="py-2 px-2 border focus:outline-none"
            placeholder="Password"
            type="password"
            {...register("password", { required: "Password is required" })}
          />
          {errors.password && (
            <p className="text-red-500 text-xs">{errors.password.message}</p>
          )}
        </div>

        <div className="flex flex-col gap-1">
          <label>
            <strong>Date of Birth</strong>
          </label>
          <input
            className="py-2 px-2 border focus:outline-none"
            type="date"
            {...register("dateOfBirth", {
              required: "Date of Birth is required",
            })}
          />
          {errors.dateOfBirth && (
            <p className="text-red-500 text-xs">{errors.dateOfBirth.message}</p>
          )}
        </div>
        <div className="flex flex-col gap-1">
          <label>
            <strong>Select a Package</strong>
          </label>
          <select
            className="py-2 px-2 border focus:outline-none"
            {...register("package", {
              required: "Package selection is required",
            })}
          >
            <option value="">Select</option>
            <option value="5">5 Members for $5</option>
            <option value="8">10 Members for $8</option>
            <option value="15">20 Members for $15</option>
          </select>
          {errors.package && (
            <p className="text-red-500 text-xs">{errors.package.message}</p>
          )}
        </div>

        <button
          className="btn btn-block bg-primary hover:bg-primary text-white"
          type="submit"
        >
          Signup
        </button>
        <div className="flex justify-center items-center pt-12 font-lato text-xs">
          <p>Already have an account?</p>
          <Link to="/login">
            <span className="underline text-primary">Login</span>
          </Link>
        </div>
      </form>
    </div>
  );
};

export default HRManagerSignup;
