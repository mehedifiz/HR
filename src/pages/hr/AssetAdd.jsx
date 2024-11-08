import { Link, useNavigate } from "react-router-dom";
import PrimaryButton from "../../components/buttons/PrimaryButton";
import DefaultInput from "../../components/input/DefaultInput";
import DefaultLabel from "../../components/label/DefaultLabel";
import SectionTitle from "../../components/sectionTitle/SectionTitle";
import PageTitle from "../../components/pageTitle/PageTitle";
import Swal from "sweetalert2";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useUserData from "../../hooks/useUserData";
import useAxiosPublic from "../../hooks/useAxiosPublic";

function AssetAdd() {
    const { userData } = useUserData();
    const axiosSecure = useAxiosPublic();
    const navigate = useNavigate();
  
    const handleSubmit = async (e) => {
      e.preventDefault();
      const form = e.target;
      const productName = form.product_name.value;
      const productType = form.product_type.value;
      // const productQuantity = form.product_quantity.value;
      const productQuantity = Number(form.product_quantity.value);
  
      const assetData = {
        product_name: productName,
        product_type: productType,
        product_quantity: productQuantity,
        creator_name: userData.name,
        userEmail: userData?.email,
        company_name: userData.company_name,
        created_date: new Date().toISOString(),
      };
  
      try {
        const response = await axiosSecure.post("/assets", assetData);
        if (response.data.insertedId) {
          Swal.fire({
            icon: "success",
            title: "Asset Created!",
            showConfirmButton: false,
            timer: 1500,
          });
          navigate("/asset-list");
        }
      } catch (error) {
        const errorMessage = error.message;
        Swal.fire({
          icon: "error",
          title: `${errorMessage}`,
        });
      }
    };
  
    return (
      <section className="py-8">
        <PageTitle title={"Add an Asset"} />
        {!userData?.payment_status ? (
          <div className="text-center">
            <p className="text-red-700 font-bold text-xl mb-4">
              You Have To Pay First
            </p>
            <Link to="/payment">
              <PrimaryButton
                buttonName={"Go For Payment"}
                buttonBGColor={"bg-blue-700"}
                buttonTextColor={"text-white"}
              />
            </Link>
          </div>
        ) : (
          <div className="container mx-auto">
            <div className="text-center">
              <SectionTitle sectionTitle={"Add an Asset"} />
            </div>
            <form
              className="mt-6 w-full lg:w-2/6 md:w-4/6 mx-auto md:px-0 px-2"
              onSubmit={handleSubmit}
            >
              <div className="mb-3">
                <div className="mb-2">
                  <DefaultLabel labelName={"Product Name"} />
                </div>
                <DefaultInput
                  inputType={"text"}
                  inputName={"product_name"}
                  inputPlaceholder={"Product Name"}
                />
              </div>
              <div className="w-full mb-3">
                <div className="mb-2">
                  <DefaultLabel labelName={"Product Type"} />
                </div>
                <select
                  required
                  name="product_type"
                  className="w-full p-2 border rounded-md text-lg"
                >
                  <option value="" selected disabled>
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
                <DefaultInput
                  inputType={"number"}
                  inputName={"product_quantity"}
                  inputPlaceholder={"Product Quantity"}
                />
              </div>
              <div className="text-center">
                <PrimaryButton
                  buttonType={"submit"}
                  buttonName={"Add"}
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
  
  export default AssetAdd;