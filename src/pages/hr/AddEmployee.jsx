import DataTable from "react-data-table-component";
import PrimaryButton from "../../components/buttons/PrimaryButton";
import { Link, useNavigate } from "react-router-dom";
import SectionTitle from "../../components/sectionTitle/SectionTitle";
import PageTitle from "../../components/pageTitle/PageTitle";
import { Checkbox, Spinner } from "@material-tailwind/react";
import Swal from "sweetalert2";
import { useState } from "react";
import useUnaffiliatedUsers from "./../../hooks/useUnaffiliatedUsers";
import useUsersByCompany from "../../hooks/useUsersByCompany";
import useUserData from "../../hooks/useUserData";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useAxiosPublic from "../../hooks/useAxiosPublic";


function AddEmployee() {
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();
  const { userData } = useUserData();
  const { unaffiliatedUsers, isLoading, refetch } = useUnaffiliatedUsers();
  const { usersByCompany } = useUsersByCompany();
  const [selectedUsers, setSelectedUsers] = useState([]);

  console.log(userData.package)

  const packageLimits = {
    basic: 5,
    standard: 10,
    premium: 20,
  };

  const currentLimit = packageLimits[userData?.package] || 0;
  const currentEmployees = usersByCompany?.length || 0;

  const handleCheckboxChange = (userId) => {
    setSelectedUsers((prevSelectedUsers) =>
      prevSelectedUsers.includes(userId)
        ? prevSelectedUsers.filter((id) => id !== userId)
        : [...prevSelectedUsers, userId]
    );
  };

  const handleAddSelectedMembers = async (e) => {
    e.preventDefault();
    if (currentEmployees + selectedUsers.length > currentLimit) {
      Swal.fire({
        icon: "error",
        title: "Limit Exceeded",
        text: `You can only add up to ${currentLimit} members (You are also a member) with this package.`,
      });
      return;
    }

    try {
      const responses = await Promise.all(
        selectedUsers.map((userId) =>
          axiosSecure.patch(`/users/${userId}`, {
            company_name: userData.company_name,
            company_logo: userData.company_logo,
          })
        )
      );

      const successCount = responses.filter(
        (response) => response.data.modifiedCount > 0
      ).length;

      if (successCount > 0) {
        refetch();
        Swal.fire({
          icon: "success",
          title: `${successCount} Employee(s) Added!`,
          showConfirmButton: false,
          timer: 1500,
        });
        navigate("/employee-list");
      }
    } catch (error) {
      console.error("Error updating users:", error);
    }
  };

  const handleAddClick = async (userId) => {
    if (currentEmployees >= currentLimit) {
      Swal.fire({
        icon: "error",
        title: "Limit Exceeded",
        text: `You can only add up to ${currentLimit} members (You are also a Member) with this package.`,
      });
      return;
    }

    try {
      const response = await axiosSecure.patch(`/users/${userId}`, {
        company_name: userData.company_name,
        company_logo: userData.company_logo,
      });
      if (response.data.modifiedCount > 0) {
        refetch();
        Swal.fire({
          icon: "success",
          title: "Employee Added!",
          showConfirmButton: false,
          timer: 1500,
        });
        navigate("/employee-list");
      }
    } catch (error) {
      console.error("Error updating user:", error);
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center mt-5">
        <Spinner />
      </div>
    );
  }

  const columns = [
    {
      name: "Select",
      cell: (row) => {
        return (
          <Checkbox
            onChange={() => handleCheckboxChange(row._id)}
            checked={selectedUsers.includes(row._id)}
          />
        );
      },
    },
    {
      name: "Member Image",
      selector: (row) => {
        console.log(row)
        return (
          <img
            src={
              row?.photoURL
                ? row.photoURL
                : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQnVzD4rGq42PnjKHt9BkhRdJdAa9ojZ1kByw&s"
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
      name: "Action",
      cell: (row) => {
        return (
          <div className="py-2 flex justify-center">
            <button
              onClick={() => handleAddClick(row._id)}
              type="button"
              className="py-2 px-4 rounded-md uppercase bg-[#6ac570] font-bold font-roboto text-white "
            >
              Add to team
            </button>
          </div>
        );
      },
    },
  ];

  return (
    <section className="py-8 bg-gray-50">
      <PageTitle title={"Add Employee"} />
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
          <div className="text-center mb-2">
            <SectionTitle sectionTitle={"Add Employee"} />
          </div>
          <div className="flex flex-col justify-center items-center">
            <h2 className="text-lg">
              You have added {usersByCompany.length } employees.
            </h2>

            <p className="text-lg my-2 mb-3 text-center">
              <span className="text-primary">
                {userData?.package === "basic"
                  ? "You Are Using 5 Members For $5 Package!"
                  : userData?.package === "standard"
                  ? "You Are Using 10 Members For $8 Package!"
                  : userData?.package === "premium"
                  ? "You Are Using 20 Members For $15 Package!"
                  : ""}
              </span>
            </p>
            <Link to="/increase">
              <button className="p-2 rounded-md uppercase font-roboto font-bold bg-primary text-white">
                Increase Limit
              </button>
            </Link>
          </div>
          {/* Data Table */}
          <div className="mt-8 bg-[#5fee34]">
            <DataTable
            
              columns={columns}
              data={unaffiliatedUsers}
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
          {unaffiliatedUsers.length > 0 && (
            <form className="mt-2" onSubmit={handleAddSelectedMembers}>
              <div className="text-center font-roboto">
                <PrimaryButton
                  buttonType={"submit"}
                  buttonName={"Add Selected Members"}
                  buttonBGColor={"bg-primary"}
                  buttonTextColor={"text-white"}
                />
              </div>
            </form>
          )}
        </div>
      )}
    </section>
  );
}

export default AddEmployee;
