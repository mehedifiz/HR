import { Spinner } from "@material-tailwind/react";
import Modal from "react-responsive-modal";
import "react-responsive-modal/styles.css";
import DataTable from "react-data-table-component";
import SectionTitle from "../../components/sectionTitle/SectionTitle";
import PageTitle from "../../components/pageTitle/PageTitle";
import useFilteredRequestedAssets from "../../hooks/useFilteredRequestedAssets";
import useUserData from "../../hooks/useUserData";
import Contract from "../../svgs/Contract";
import { useState } from "react";

function MyAssets() {
  const { requestedAssets, isLoading } = useFilteredRequestedAssets();
  const { userData } = useUserData();
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("");

  const handleSearchChange = (e) => setSearchTerm(e.target.value);
  const handleFilterChange = (e) => setFilterStatus(e.target.value);

  // Filtered assets based on search and filter terms
  const filteredAssets = requestedAssets.filter(
    (asset) =>
      asset.asset_name.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (filterStatus ? asset.status === filterStatus || asset.asset_type === filterStatus : true)
  );

  // Columns configuration for DataTable
  const columns = [
    { name: "#", cell: (row, index) => <div>{index + 1}</div> },
    { name: "Asset Name", selector: (row) => row.asset_name, sortable: true },
    { name: "Asset Type", selector: (row) => row.asset_type, sortable: true },
    { name: "Request Date", selector: (row) => new Date(row.request_date).toLocaleDateString(), sortable: true },
    { name: "Request Status", selector: (row) => row.status, sortable: true },
  ];

  if (isLoading) {
    return (
      <div className="flex justify-center mt-5">
        <Spinner />
      </div>
    );
  }

  // Show "Contact HR" message if no company is associated with the user
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
      <PageTitle title="My Requested Assets" />
      <section className="py-8">
        <div className="container mx-auto">
          <SectionTitle sectionTitle="My Requested Assets" />
          <div className="flex gap-6 items-start mt-12">
            <input
              type="text"
              placeholder="Search by asset name"
              className="p-2 rounded-md border border-green-700 w-full max-w-[320px]"
              value={searchTerm}
              onChange={handleSearchChange}
            />
            <select
              className="p-2 rounded-md bg-gray-200 text-green-700"
              value={filterStatus}
              onChange={handleFilterChange}
            >
              <option value="" disabled>
                Filter Assets
              </option>
              <option value="Pending">Pending</option>
              <option value="Approved">Approved</option>
              <option value="Returnable">Returnable</option>
              <option value="Non-Returnable">Non-Returnable</option>
            </select>
          </div>
          <div className="mt-8">
            {filteredAssets.length === 0 ? (
              <div className="text-center text-gray-500">No assets match your criteria.</div>
            ) : (
              <DataTable columns={columns} data={filteredAssets} pagination highlightOnHover />
            )}
          </div>
        </div>
      </section>
    </>
  );
}

export default MyAssets;
