import { Spinner } from "@material-tailwind/react";
import Modal from "react-responsive-modal";
import "react-responsive-modal/styles.css";
import PrimaryButton from "../../components/buttons/PrimaryButton";
import DataTable from "react-data-table-component";
import SectionTitle from "../../components/sectionTitle/SectionTitle";
import PageTitle from "../../components/pageTitle/PageTitle";
import Swal from "sweetalert2";
import { useQuery } from "@tanstack/react-query";
import useUserData from "../../hooks/useUserData";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useAuth from "../../hooks/useAuth";
import Contract from "../../svgs/Contract";

function RequestForAsset() {
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();
  
  const [open, setOpen] = useState(false);
  const [currentRow, setCurrentRow] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterTerm, setFilterTerm] = useState("");
  
  const { userData, isLoading: userDataLoading } = useUserData();
  const { user } = useAuth();

  const onOpenModal = (row) => {
    setCurrentRow(row);
    setOpen(true);
  };

  const onCloseModal = () => setOpen(false);

  // Conditionally fetch data if the user is associated with a company
  const {
    data: assets = [],
    isLoading: assetsLoading,
    isError,
    error,
    refetch,
  } = useQuery({
    queryKey: ["assets", user?.email, searchTerm, filterTerm],
    queryFn: async () => {
      if (!user?.email) throw new Error("User email is not available");

      const response = await axiosSecure.get(`/assets`, {
        params: {
          userEmail: user?.email,
          search: searchTerm,
          filter: filterTerm,
        },
      });
      return response.data;
    },
    enabled: !!userData?.company_name, // Fetch data only if company is linked
  });

  const handleSearchChange = (e) => setSearchTerm(e.target.value);
  const handleFilterChange = (e) => setFilterTerm(e.target.value);

  const handleRequest = async (e) => {
    e.preventDefault();
    const form = e.target;
    const requestAssetInfo = {
      note: form.note.value,
      status: "Pending",
      request_date: new Date().toISOString(),
      asset_id: currentRow._id,
      asset_name: currentRow.product_name,
      asset_type: currentRow.product_type,
      asset_quantity: currentRow.product_quantity,
      requester_name: userData.name,
      requester_email: userData.email,
      requester_company: userData.company_name,
    };

    try {
      const response = await axiosSecure.post("/requested-assets", requestAssetInfo);
      if (response.data.insertedId) {
        Swal.fire({
          icon: "success",
          title: "Request submitted successfully!",
          showConfirmButton: false,
          timer: 1500,
        });
        refetch();
        navigate("/my-assets");
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: error.message,
      });
    }
  };

  const columns = [
    { name: "#", cell: (row, index) => <div>{index + 1}</div> },
    { name: "Asset Name", selector: (row) => row?.product_name, sortable: true },
    { name: "Asset Type", selector: (row) => row?.product_type, sortable: true },
    {
      name: "Availability",
      selector: (row) => parseInt(row?.product_quantity) > 0 ? "Available" : "Out Of Stock",
      sortable: true,
    },
    {
      name: "Action",
      cell: (row) => (
        parseInt(row?.product_quantity) > 0 ? (
          <span onClick={() => onOpenModal(row)}>
            <PrimaryButton
              buttonName="Request"
              buttonTextColor="text-white"
              buttonBGColor="bg-green-700"
            />
          </span>
        ) : (
          <button className="px-5 py-2 text-lg rounded-md cursor-not-allowed opacity-50 bg-red-400 text-white">
            Out Of Stock
          </button>
        )
      ),
    },
  ];

  // Loading state when user data or assets data is loading
  if (userDataLoading || assetsLoading) {
    return (
      <div className="flex justify-center mt-5">
        <Spinner />
      </div>
    );
  }

  // If no company is linked to the user, show a "Contact HR" message
  if (!userData?.company_name) {
    return (
      <div className="flex flex-col items-center gap-4 mt-20">
        <Contract className="w-24 h-24 text-red-400" />
        <h2 className="font-bold text-red-500 text-2xl mt-4">
          It looks like you're not connected to a company yet.
        </h2>
        <p className="text-gray-600 text-lg mt-2 max-w-lg text-center">
          To get started with our platform, please reach out to your HR representative for assistance. 
          Once you're added to your company’s network, you’ll have access to all features and resources available to employees.
        </p>
        <button
          className="mt-6 px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition duration-200"
          onClick={() => {
            // Optional: Action to contact HR, open email, etc.
          }}
        >
          Contact HR Support
        </button>
      </div>
    );
  }

  return (
    <>
      <PageTitle title="Request For An Asset" />
      <section className="py-8">
        <div className="container mx-auto">
          <div className="text-center">
            <SectionTitle sectionTitle="Request For An Asset" />
          </div>
          <div className="flex flex-wrap gap-6 items-start mt-12">
            <div className="w-full max-w-[320px]">
              <input
                type="text"
                placeholder="Search Item By Asset Name"
                className="p-2 rounded-md border border-green-700 w-full"
                value={searchTerm}
                onChange={handleSearchChange}
              />
            </div>
            <div className="w-full max-w-[320px]">
              <select
                className="w-[200px] p-2 rounded-md bg-gray-200 text-green-700 font-normal text-lg"
                value={filterTerm}
                onChange={handleFilterChange}
              >
                <option value="">Filter Assets</option>
                <option value="Available">Available</option>
                <option value="Out Of Stock">Out Of Stock</option>
                <option value="Returnable">Returnable</option>
                <option value="Non-Returnable">Non-Returnable</option>
              </select>
            </div>
          </div>
          {/* Data Table */}
          <div className="mt-8">
            <DataTable
              columns={columns}
              data={assets}
              pagination
              highlightOnHover
            />
          </div>
        </div>
      </section>
      <Modal
        open={open}
        onClose={onCloseModal}
        center
        styles={{ modal: { maxWidth: "800px", width: "100%" } }}
      >
        {currentRow && (
          <div>
            <form onSubmit={handleRequest}>
              <div className="mt-4">
                <label htmlFor="notes" className="block mb-2">
                  Additional Notes:
                </label>
                <textarea
                  required
                  name="note"
                  id="notes"
                  className="w-full p-2 border rounded-md border-green-500"
                  placeholder="Write Notes"
                  rows="4"
                ></textarea>
              </div>
              <div className="mt-4 text-center">
                <PrimaryButton
                  buttonName="Submit Request"
                  buttonTextColor="text-white"
                  buttonBGColor="bg-green-700"
                />
              </div>
            </form>
            
          </div>
        )}
      </Modal>
    </>
  );
}

export default RequestForAsset;
