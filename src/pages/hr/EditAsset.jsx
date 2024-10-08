import { Link, useLoaderData, useNavigate } from "react-router-dom";
import PrimaryButton from "../../components/buttons/PrimaryButton";
import DefaultLabel from "../../components/label/DefaultLabel";
import SectionTitle from "../../components/sectionTitle/SectionTitle";
import PageTitle from "../../components/pageTitle/PageTitle";
import Swal from "sweetalert2";
import useUpdateAsset from './../../hooks/useUpdateAsset';
import { useState } from "react";
import useUserData from "../../hooks/useUserData";

function EditAsset() {
    const { userData } = useUserData();
    const item = useLoaderData();
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
      product_name: item?.product_name,
      product_type: item?.product_type,
      product_quantity: Number(item?.product_quantity), // Ensure this is a number
    });
    // console.log(item);
  
    const { mutate } = useUpdateAsset(() => {
      Swal.fire({
        title: "Success!",
        text: "Asset updated successfully.",
        icon: "success",
        confirmButtonText: "OK",
      }).then(() => {
        navigate("/asset-list");
      });
    });
  
    const handleChange = (e) => {
      const { name, value } = e.target;
      setFormData((prevData) => ({
        ...prevData,
        [name]: name === "product_quantity" ? Number(value) : value, // Ensure product_quantity is a number
      }));
    };
  
    const handleSubmit = (e) => {
      e.preventDefault();
      mutate({ id: item._id, data: formData });
    };
  
    return (
      <section className="py-8">
        <PageTitle title={"Edit an Asset"} />
        {!userData?.payment_status ? (
          <div className="text-center">
            <p className="text-red-700 font-bold text-xl mb-4">
              You Have To Pay First
            </p>
            <Link to="/payment">
              <PrimaryButton
                buttonName={"Go For Payment"}
                buttonBGColor={"bg-green-700"}
                buttonTextColor={"text-white"}
              />
            </Link>
          </div>
        ) : (
          <div className="template-container">
            <div className="text-center">
              <SectionTitle sectionTitle={"Edit an Asset"} />
            </div>
            <form
              className="mt-6 w-full md:w-2/3 mx-auto"
              onSubmit={handleSubmit}
            >
              <div className="mb-3">
                <div className="mb-2">
                  <DefaultLabel labelName={"Product Name"} />
                </div>
                <input
                  placeholder="Product Name"
                  type="text"
                  name="product_name"
                  className="w-full p-2 rounded-md border border-green-700"
                  value={formData.product_name}
                  onChange={handleChange}
                />
              </div>
              <div className="w-full mb-3">
                <div className="mb-2">
                  <DefaultLabel labelName={"Product Type"} />
                </div>
                <select
                  value={formData.product_type}
                  name="product_type"
                  className="w-full p-2 border border-green-700 rounded-md text-lg"
                  onChange={handleChange}
                >
                  <option value="" disabled>
                    Select Option
                  </option>
                  <option value="Returnable">Returnable</option>
                  <option value="Non-Returnable">Non-Returnable</option>
                </select>
              </div>
              <div className="w-full mb-6">
                <div className="mb-2">
                  <DefaultLabel labelName={"Product Quantity"} />
                </div>
                <input
                  placeholder="Product Quantity"
                  type="number"
                  name="product_quantity"
                  className="w-full p-2 rounded-md border border-green-700"
                  value={formData.product_quantity}
                  onChange={handleChange}
                />
              </div>
              <div className="text-center">
                <PrimaryButton
                  buttonType={"submit"}
                  buttonName={"Update"}
                  buttonBGColor={"bg-primary"}
                  buttonTextColor={"text-white"}
                />
              </div>
            </form>
          </div>
        )}
      </section>
    );
  }
  
  export default EditAsset;