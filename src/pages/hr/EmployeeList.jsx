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
import Team from "../../svgs/Team";

function EmployeeList() {
  const { usersByCompany, isLoading, refetch } = useUsersByCompany();
  const axiosSecure = useAxiosSecure();
  const [loading, setLoading] = useState(false);
  const { userData } = useUserData();

  const handleRemoveUser = async (userId) => {
    // Show confirmation prompt
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "Do you really want to remove this employee? This action cannot be undone.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, remove",
      cancelButtonText: "Cancel",
    });
  
    // Check if the user confirmed the action
    if (result.isConfirmed) {
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
        Swal.fire({
          icon: "error",
          title: "Failed to remove employee",
          text: "Something went wrong. Please try again later.",
        });
      } finally {
        setLoading(false);
      }
    }
  };
  

  if (isLoading || loading) {
    return (
      <div className="flex justify-center mt-8">
        <Spinner className="text-primary" />
      </div>
    );
  }

  const columns = [
    {
      name: "#",
      cell: (row, index) => <div>{index + 1}</div>,
      
      
    },
    {
      name: "Member Image",
      selector: (row) => {
        return (
          <img
            src={
              row?.photoURL
                ? row.photoURL
                : "https://cdn.pixabay.com/photo/2021/07/02/04/48/user-6380868_1280.png"
            }
            alt="Image"
            className="h-[100px] w-[100px] object-cover rounded-full shadow-md"
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
        return <p className="uppercase text-gray-700 font-semibold">{row.role}</p>;
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
                className="p-2 px-4 rounded-md bg-red-600 text-white font-semibold text-sm hover:bg-red-700 transition duration-200"
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
    <section className="py-8 bg-gray-50">
      <PageTitle title={"Employee List"} />
      {!userData?.payment_status ? (
        <div className="text-center bg-white p-6 rounded-lg shadow-xl mx-auto max-w-lg mt-6">
          <p className="text-red-600 font-bold text-xl mb-4">
            You Need To Pay First
          </p>
          <Link to="/payment">
            <PrimaryButton
              buttonName={"Proceed to Payment"}
              buttonBGColor={"bg-primary"}
              buttonTextColor={"text-white"}
            />
          </Link>
        </div>
      ) : (
        <div className="container mx-auto mt-12 px-6">
          <div className="text-center flex flex-col items-center justify-center  p-8 rounded-lg shadow-sm ">
            <SectionTitle sectionTitle={"My Employee List"} />
             <Team/>
          </div>

          <div className="mt-4 bg-[#bfe8b3] p-6 rounded-lg shadow-lg">
            {/* Data Table */}
            <DataTable
              columns={columns}
              data={usersByCompany}
              pagination
              highlightOnHover
              customStyles={{
                headCells: {
                  style: {
                    backgroundColor: "#aab18d",
                    color: "black",
                    fontWeight: "bold",
                  },
                },
                rows: {
                  style: {
                    cursor: "pointer",
                  },
                },
              }}
            />
          </div>
        </div>
      )}
    </section>
  );
}

export default EmployeeList;
