import React, { useContext, useEffect } from "react";
import { useForm } from "react-hook-form";
import { AuthContext } from "../../providers/AuthProvider";
import Swal from "sweetalert2";
import { Avatar } from "@material-tailwind/react";
import useUserData from "../../hooks/useUserData";

const Profile = () => {
  const { user, setUser, updateUserProfile } = useContext(AuthContext);
  const { register, handleSubmit, setValue, watch } = useForm();

  const {photoURL} = useUserData()
  const userData = useUserData(); 
  console.log(userData)
  useEffect(() => {
    if (user) {
      // Prepopulate form with existing user data
      setValue("fullName", user.displayName);
    }
  }, [user, setValue]);

  const onSubmit = (data) => {
    // Call the function to update the user profile
    updateUserProfile(data.fullName, user?.photoURL)
      .then(() => {
        // Update user context or state after successful update
        setUser((prevUser) => ({
          ...prevUser,
          displayName: data.fullName,
        }));

        Swal.fire({
          position: "center",
          icon: "success",
          title: "Profile updated successfully!",
          showConfirmButton: false,
          timer: 1500,
        });
      })
      .catch((error) => {
        console.error("Error updating profile:", error);
      });
  };

  return (
    <div className="min-h-screen bg-gray-50 flex justify-center items-center py-10">
      <div className="w-full max-w-md bg-white shadow-lg rounded-lg p-6 flex flex-col justify-center items-center space-y-6">
        {user && (
          <div className="flex justify-center items-center pb-4">
            <Avatar
              className="w-32 h-32 rounded-full border-4 border-primary"
              src={
                photoURL ?photoURL 
                  : "https://upload.wikimedia.org/wikipedia/commons/thumb/2/24/Missing_avatar.svg/2048px-Missing_avatar.svg.png"
              }
              alt="User Avatar"
            />
          </div>
        )}

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="w-full flex flex-col items-center space-y-4"
        >
          {/* Full Name (Editable) */}
          <div className="w-full">
            <input
              className="w-full border-b px-3 py-2 focus:outline-none"
              type="text"
              placeholder="Full Name"
              {...register("fullName")}
            />
          </div>

          {/* Email (Read-Only) */}
          <div className="w-full">
            <p className="text-gray-500 px-3 py-2 border-b">{user?.email}</p>
          </div>

          {/* Update Button */}
          <button
            className="w-full bg-blue-600 text-white py-2 mt-4 rounded-md"
            type="submit"
          >
            Update Profile
          </button>
        </form>
      </div>
    </div>
  );
};

export default Profile;
