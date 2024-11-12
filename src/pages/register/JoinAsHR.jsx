import { useNavigate } from "react-router-dom";
import PrimaryButton from "../../components/buttons/PrimaryButton";
import DefaultInput from "../../components/input/DefaultInput";
import DefaultLabel from "../../components/label/DefaultLabel";
import PageTitle from "../../components/pageTitle/PageTitle";
import SectionTitle from "../../components/sectionTitle/SectionTitle";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import useAuth from "../../hooks/useAuth";
import { useState } from "react";
import Swal from "sweetalert2";
import axios from "axios";
import PropTypes from "prop-types";
import { toast } from "react-toastify";
import { Helmet } from "react-helmet-async";

function JoinAsHR({
  sectionBG = "bg-gray-400",
  cardBG = "bg-white",
  cardShadow = "shadow-xl",
  inputBorder = "border border-indigo-300",
  inputBG = "bg-indigo-50",
  buttonTextColor = "text-white",
  buttonBGColor = "bg-indigo-700 hover:bg-indigo-800",
  spinnerColor = "text-success",
}) {
  const navigate = useNavigate();
  const axiosPublic = useAxiosPublic();
  const { createUser, setUser, updateUserProfile, loading } = useAuth();
  const [formLoading, setFormLoading] = useState(false);

  const handleCreateUser = async (e) => {
    e.preventDefault();
    setFormLoading(true);
    const form = e.target;
    const name = form.name.value;
    const email = form.email.value;
    const password = form.password.value;
    const dob = form.dob.value;
    const companyName = form.company_name.value.trim().toLowerCase();
    const packageType = form.packages.value;
    const imageFile = form.image.files[0];

    if (!imageFile || imageFile.size > 100 * 1024) {
      toast.error("Image Size must Be 100 KB or Less")

      setFormLoading(false);
      return;
    }

    if (password.length < 6 || !/[A-Z]/.test(password) || !/[a-z]/.test(password)) {
      Swal.fire({
        icon: "error",
        title: "Password must be at least 6 characters with an uppercase and lowercase letter.",
      });
      setFormLoading(false);
      return;
    }

    
      const formData = new FormData();
      formData.append("image", imageFile);
      
      try {
        const imgResponse = await axios.post(
          `https://api.imgbb.com/1/upload?key=03a11aecd3b3e6c79ffffb5deacd2888`,
          formData
        );
      
        const imageUrl = imgResponse.data.data.display_url;
      
        const userInfo = {
          name,
          email,
          password,
          company_logo: imageUrl, 
          dob,
          company_name: companyName,
          package: packageType,
          role: "hr",
          payment_status: false,
        };

      const { data: userResponse } = await axiosPublic.post("/users", userInfo);
      if (userResponse.insertedId) {
        await createUser(email, password);
        await updateUserProfile(name);
        setUser((prevUser) => ({ ...prevUser, displayName: name }));
        
        toast.success('You are a HR!')
        navigate("/payment");
      } else {
        Swal.fire({ icon: "error", title: userResponse.message });
      }
    } catch (error) {
      const errorMessage = error.message
        .replace(/.*\//, "")
        .replace(/\)\./g, "")
        .replace(/-/g, " ")
        .replace(/\b\w/g, (char) => char.toUpperCase());
      Swal.fire({ icon: "error", title: errorMessage });
    } finally {
      setFormLoading(false);
    }
  };

  return (
    <>
    
      <section className={`py-12 ${sectionBG}`}>
    
        <div className={`mx-auto text-center w-full lg:w-2/3 p-8 ${cardBG} rounded-3xl ${cardShadow} transform transition duration-500 hover:scale-105`}>
          <SectionTitle sectionTitle="Join As HR Manager" />
          {(loading || formLoading) && (
             <span className={`loading loading-spinner ${spinnerColor}`}></span>
          )}
          <form onSubmit={handleCreateUser} className="px-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
              <div>
                <DefaultLabel labelName="Full Name" />
                <DefaultInput
                  inputType="text"
                  inputName="name"
                  inputPlaceholder="Full Name"
                  className={`${inputBorder} rounded-lg p-3 ${inputBG}`}
                />
              </div>
              <div>
                <DefaultLabel labelName="Company Name" />
                <DefaultInput
                  inputType="text"
                  inputName="company_name"
                  inputPlaceholder="Company Name"
                  className={`${inputBorder} rounded-lg p-3 ${inputBG}`}
                />
              </div>
              <div>
                <DefaultLabel labelName="Select A Package" />
                <select
                  required
                  name="packages"
                  className={`w-full ${inputBorder} p-3 rounded-lg text-gray-700 ${inputBG} hover:bg-indigo-100 transition`}
                >
                  <option value="" disabled selected>Choose your package</option>
                  <option value="basic">5 Members for $5</option>
                  <option value="standard">10 Members for $8</option>
                  <option value="premium">20 Members for $15</option>
                </select>
              </div>
              <div>
                <DefaultLabel labelName="Email" />
                <DefaultInput
                  inputType="email"
                  inputName="email"
                  inputPlaceholder="Email"
                  className={`${inputBorder} rounded-lg p-3 ${inputBG}`}
                />
              </div>
              <div>
                <DefaultLabel labelName="Password" />
                <DefaultInput
                  inputType="password"
                  inputName="password"
                  inputPlaceholder="Password"
                  className={`${inputBorder} rounded-lg p-3 ${inputBG}`}
                />
              </div>
              <div>
                <DefaultLabel labelName="Date Of Birth" />
                <DefaultInput inputType="date" inputName="dob" className={`${inputBorder} rounded-lg p-3 ${inputBG}`} />
              </div>
              <div>
                <DefaultLabel labelName="Company Logo" />
                <input
                  required
                  type="file"
                  name="image"
                  className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-blue-50 file:text-indigo-700 hover:file:bg-blue-100"
                />
              </div>
            </div>
            <PrimaryButton
              buttonType="submit"
              buttonName="Sign Up"
              buttonTextColor={buttonTextColor}
              buttonBGColor={buttonBGColor}
              className="w-full py-3 rounded-lg shadow-lg transform hover:scale-105 transition duration-300"
            />
          </form>
        </div>
      </section>
    </>
  );
}

 

export default JoinAsHR;
