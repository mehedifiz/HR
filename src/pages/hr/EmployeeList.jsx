import DataTable from "react-data-table-component";
import SectionTitle from "../../components/sectionTitle/SectionTitle";
import PrimaryButton from "../../components/buttons/PrimaryButton";
import { Link } from "react-router-dom";
import PageTitle from "../../components/pageTitle/PageTitle";
import { Spinner } from "@material-tailwind/react";
import Swal from "sweetalert2";
import useUserData from "../../hooks/useUserData";
import { useState } from "react";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useUsersByCompany from "../../hooks/useUsersByCompany";

function EmployeeList() {
    const { usersByCompany, isLoading, refetch } = useUsersByCompany();
    const axiosSecure = useAxiosSecure();
    const [loading, setLoading] = useState(false);
    const { userData } = useUserData();
  
    const handleRemoveUser = async (userId) => {
      try {
        setLoading(true);
        await axiosSecure.patch(`/users/${userId}`);
        Swal.fire({
          icon: "success",
          title: "Employee Removed!",
          showConfirmButton: false,
          timer: 1500,
        });
        refetch(); // Refresh the user list
      } catch (error) {
        console.error("Error updating user:", error);
      } finally {
        setLoading(false);
      }
    };
  
    if (isLoading || loading) {
      return (
        <div className="flex justify-center mt-5">
          <Spinner />
        </div>
      );
    }
  
    const columns = [
      {
        name: "#", // Column header for serial number
        cell: (row, index) => <div>{index + 1}</div>, // Render serial number based on row index
      },
      {
        name: "Member Image",
        selector: (row) => {
          return (
            <img
              src={
                row?.profile_image
                  ? row.profile_image
                  : "https://upload.wikimedia.org/wikipedia/commons/thumb/2/24/Missing_avatar.svg/2048px-Missing_avatar.svg.png"
              }
              alt="Image"
              className="h-[100px] w-[100px] object-cover rounded my-2"
            />
          );
        },
        sortable: true,
      },
      {
        name: "Member Name",
        selector: (row) => row?.name,
        sortable: true,
      },
      {
        name: "Member Type",
        selector: (row) => {
          return <p className="uppercase">{row.role}</p>;
        },
        sortable: true,
      },
      {
        name: "Action",
        cell: (row) => {
          if (row.role === "hr") {
            return "";
          } else {
            return (
              <div className="py-2 flex justify-center">
                <button
                  onClick={() => handleRemoveUser(row._id)}
                  type="button"
                  className="p-1 rounded-md bg-red-700 text-white text-base"
                >
                  Remove
                </button>
              </div>
            );
          }
        },
      },
    ];
  
    return (
      <section className="py-8">
        <PageTitle title={"Employee List"} />
        {!userData?.payment_status ? (
          <div className="text-center">
            <p className="text-red-700 font-bold text-xl mb-4">
              You Have To Pay First
            </p>
            <Link to="/payment">
              <PrimaryButton
                buttonName={"Go For Payment"}
                buttonBGColor={"bg-primary"}
                buttonTextColor={"text-white"}
              />
            </Link>
          </div>
        ) : (
          <div className="container mx-auto">
            <div className="text-center">
              <SectionTitle sectionTitle={"My Employee List"} />
              {/* Data Table */}
              <div className="mt-2">
                
              </div>
            </div>
          </div>
        )}
      </section>
    );
  }
  
  export default EmployeeList;