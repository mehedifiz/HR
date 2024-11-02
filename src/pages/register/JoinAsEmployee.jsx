// import { useForm } from "react-hook-form";
// import SocialLogin from "../../components/SocialLogin";
// import { Link, useNavigate } from "react-router-dom";
// import { useContext } from "react";
// import { AuthContext } from "../../providers/AuthProvider";
// import useAxiosPublic from "../../hooks/useAxiosPublic";
// import Swal from "sweetalert2";

import { useNavigate } from "react-router-dom";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import useAuth from "../../hooks/useAuth";
import Swal from "sweetalert2";
import { updateProfile } from "firebase/auth";
import PageTitle from "../../components/pageTitle/PageTitle";
import GoogleButton from "../../components/buttons/GoogleButton";
import PrimaryButton from "../../components/buttons/PrimaryButton";
import DefaultInput from "../../components/input/DefaultInput";
import DefaultLabel from "../../components/label/DefaultLabel";
import SectionTitle from "../../components/sectionTitle/SectionTitle";

// const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
// const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;

// const EmployeeSignup = () => {
//   const { createUser, updateUserProfile } = useContext(AuthContext);
//   const axiosPublic = useAxiosPublic();
//   const navigate = useNavigate();
//   const {
//     register,
//     handleSubmit,
//     reset,
//     formState: { errors },
//   } = useForm();

//   const onSubmit = async (data) => {
//     console.log(data);
//     console.log(data.image[0]);
//     const imageFile = { image: data.image[0] };
//     const res = await axiosPublic.post(image_hosting_api, imageFile, {
//       headers: {
//         "content-Type": "multipart/form-data",
//       },
//     });
//     console.log(res.data.data.display_url);
//     if (res.data.success) {
//       createUser(data.email, data.password)
//         .then((result) => {
//           const loggedUser = result.user;
//           console.log(loggedUser);
//           Swal.fire({
//             position: "center",
//             icon: "success",
//             title: "Registration Successfull.",
//             showConfirmButton: false,
//             timer: 1500,
//           });
//           updateUserProfile(data.fullName, res.data.data.display_url)
//             .then(() => {
//               console.log("User profile updated.");
//               const userInfo = {
//                 name: data.fullName,
//                 email: data.email,
//                 image: res.data.data.display_url,
//                 dateOfBirth: data.dateOfBirth,
//                 isJoin: 'false',
//                 role: 'employee'
//               };
//               axiosPublic.post("/users", userInfo).then((res) => {
//                 if (res.data.insertedId) {
//                   console.log("User added to database.");
//                   reset();
//                   Swal.fire({
//                     position: "center",
//                     icon: "success",
//                     title: "User Created Successfully!.",
//                     showConfirmButton: false,
//                     timer: 1500,
//                   });
//                   navigate("/");
//                 }
//               });
//             })
//             .catch((error) => {
//               console.log(error);
//             });
//         })
//         .then((error) => {
//           console.log(error);
//         });
//     }
//   };

//   return (
//     <div className="py-8 xl:w-4/12 lg:w-5/12 md:w-6/12 w-full mx-auto">
//       <form
//         className="p-5 space-y-3 font-roboto border"
//         onSubmit={handleSubmit(onSubmit)}
//       >
//         <div className="flex items-center mb-8 justify-center font-bold font-roboto text-3xl">
//           <h2>Join as Employee</h2>
//         </div>
//         <div className="flex flex-col gap-1">
//           <label>
//             <strong>Full Name</strong>
//           </label>
//           <input
//             className="py-2 px-2 border focus:outline-none"
//             placeholder="Full Name"
//             type="text"
//             {...register("fullName", { required: "Full Name is required" })}
//           />
//           {errors.fullName && (
//             <p className="text-red-500 text-xs">{errors.fullName.message}</p>
//           )}
//         </div>
//         <div className="flex flex-col gap-1">
//           <label>
//             <strong>Email</strong>
//           </label>
//           <input
//             className="py-2 px-2 border focus:outline-none"
//             placeholder="Email"
//             type="email"
//             {...register("email", { required: "Email is required" })}
//           />
//           {errors.email && (
//             <p className="text-red-500 text-xs">{errors.email.message}</p>
//           )}
//         </div>
//         <div className="flex flex-col gap-1">
//           <label>
//             <strong>Password</strong>
//           </label>
//           <input
//             className="py-2 px-2 border focus:outline-none"
//             placeholder="Password"
//             type="password"
//             {...register("password", { required: "Password is required" })}
//           />
//           {errors.password && (
//             <p className="text-red-500 text-xs">{errors.password.message}</p>
//           )}
//         </div>
//         <div className="flex flex-col gap-1">
//           <label>
//             <strong>Date of Birth</strong>
//           </label>
//           <input
//             className="py-2 px-2 border focus:outline-none"
//             type="date"
//             {...register("dateOfBirth", {
//               required: "Date of Birth is required",
//             })}
//           />
//           {errors.dateOfBirth && <p>{errors.dateOfBirth.message}</p>}
//         </div>
//         <div className="flex flex-col gap-1">
//           <label>
//             <strong>Upload Image</strong>
//           </label>
//           <input
//             type="file"
//             {...register("image", {
//               required: "Company Logo is required",
//             })}
//           />
//           {errors.image && (
//             <p className="text-red-500 text-xs">{errors.image.message}</p>
//           )}
//         </div>
//         <button
//           className="btn btn-block bg-primary hover:bg-primary text-white"
//           type="submit"
//         >
//           Signup
//         </button>
//         <div className="flex justify-center items-center pt-12 font-lato text-xs">
//           <p>Already have an account?</p>
//           <Link to="/login">
//             <span className="underline text-primary">Login</span>
//           </Link>
//         </div>
//       </form>
//       <div className="flex items-center justify-center">
//           <SocialLogin></SocialLogin>
//         </div>
//     </div>
//   );
// };

// export default EmployeeSignup;


function JoinAsEmployee() {
  const navigate = useNavigate();
  const axiosPublic = useAxiosPublic();
  const { createUser, setUser, signInWithGoogle } = useAuth();

  const handleCreateUser = async (e) => {
    e.preventDefault();
    const form = e.target;
    const name = form.name.value;
    const email = form.email.value;
    const password = form.password.value;
    const dob = form.dob.value;

    // Validation
    if (password.length < 6) {
      Swal.fire({
        icon: "error",
        title: "Please Enter A Password Of At Least 6 Characters",
      });
      return;
    } else if (!/[A-Z]/.test(password)) {
      Swal.fire({
        icon: "error",
        title: "Please Enter A Password Of At Least 1 Uppercase Character",
      });
      return;
    } else if (!/[a-z]/.test(password)) {
      Swal.fire({
        icon: "error",
        title: "Please Enter A Password Of At Least 1 Lowercase Character",
      });
      return;
    }

    try {
      const usersInfo = {
        name: name,
        email: email,
        dob: dob,
        role: "employee",
      };

      const response = await axiosPublic.post("/users", usersInfo);
      console.log(response);
      const result = await createUser(email, password);
      await updateProfile(result.user, {
        displayName: name,
      });
      setUser((prevUser) => {
        return { ...prevUser, displayName: name };
      });
      Swal.fire({
        icon: "success",
        title: "Employee Created!",
        showConfirmButton: false,
        timer: 1500,
      });
      navigate("/");
    } catch (error) {
      const errorMessage =
        error.response?.data.message ||
        error.message
          .split("/")[1]
          .replace(/\)\./g, "")
          .replace(/-/g, " ")
          .replace(/\b\w/g, (char) => char.toUpperCase());
      Swal.fire({
        icon: "error",
        title: `${errorMessage}`,
      });
    }
  };

  const handleCreateUserByGoogle = (event) => {
    event.preventDefault();
    signInWithGoogle()
      .then((result) => {
        const usersInfo = {
          name: result.user?.displayName,
          email: result.user?.email,
          profile_image: result.user?.photoURL,
          role: "employee",
        };
        axiosPublic.post("/users", usersInfo).then((response) => {
          console.log(response.data);
          setUser(result.user);
          Swal.fire({
            icon: "success",
            title: "Employee Created!",
            showConfirmButton: false,
            timer: 1500,
          });
          navigate("/");
        });
      })
      .catch((error) => {
        const errorMessage = error.message
          .split("/")[1]
          .replace(/\)\./g, "")
          .replace(/-/g, " ")
          .replace(/\b\w/g, (char) => char.toUpperCase());
        Swal.fire({
          icon: "error",
          title: `${errorMessage}`,
        });
      });
  };

  return (
    <>
      <PageTitle title={"Join As Employee"} />
      <section className="template-container py-6">
        <div className="mx-auto text-center w-full lg:w-2/6 md:w-3/6">
          <div>
            <SectionTitle sectionTitle={"Join As Employee"} />
            <form onSubmit={handleCreateUser} className="md:px-0 px-2 pb-8">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
                <div>
                  <DefaultLabel labelName={"Full Name"} />
                  <DefaultInput
                    inputType={"text"}
                    inputName={"name"}
                    inputPlaceholder={"Full Name"}
                  />
                </div>
                <div>
                  <DefaultLabel labelName={"Email"} />
                  <DefaultInput
                    inputType={"email"}
                    inputName={"email"}
                    inputPlaceholder={"Email"}
                  />
                </div>
                <div>
                  <DefaultLabel labelName={"Password"} />
                  <DefaultInput
                    inputType={"password"}
                    inputName={"password"}
                    inputPlaceholder={"Password"}
                  />
                </div>
                <div>
                  <DefaultLabel labelName={"Data Of Birth"} />
                  <DefaultInput inputType={"date"} inputName={"dob"} />
                </div>
              </div>
              <div className="flex justify-center items-center gap-3 flex-wrap">
                <PrimaryButton
                  buttonType={"submit"}
                  buttonName={"Signup"}
                  buttonTextColor={"text-white"}
                  buttonBGColor={"bg-primary"}
                />
              </div>
            </form>
            <p className="mb-1 font-roboto text-center text-lg">Or Signup With Google</p>
            <span onClick={handleCreateUserByGoogle}>
              <GoogleButton />
            </span>
          </div>
        </div>
      </section>
    </>
  );
}

export default JoinAsEmployee;
