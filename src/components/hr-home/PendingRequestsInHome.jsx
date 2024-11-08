import DataTable from "react-data-table-component";
import SectionTitle from "../sectionTitle/SectionTitle";
import { Spinner } from "@material-tailwind/react";
import useRequestedAssets from './../../hooks/useRequestedAssets';
import useUserData from "../../hooks/useUserData";
import Nothing from "../../svgs/Nothing";

function PendingRequestsInHome() {
    const { userData } = useUserData();
    const { requestedAssets, isLoading } = useRequestedAssets();
  
    const filteredRequestedAssets = requestedAssets.filter(
      (asset) =>
        asset.requester_company === userData?.company_name &&
        asset.status === "Pending"
    );
  
    const columns = [
      {
        name: "#",
        cell: (row, index) => <div className="text-lg font-medium">{index + 1}</div>,
      },
      {
        name: "Asset Name",
        selector: (row) => row.asset_name,
        sortable: true,
        cell: (row) => <div className="text-lg text-gray-800">{row.asset_name}</div>
      },
      {
        name: "Request Date",
        selector: (row) => new Date(row.request_date).toLocaleDateString(),
        sortable: true,
        cell: (row) => <div className="text-lg">{new Date(row.request_date).toLocaleDateString()}</div>
      },
      {
        name: "Requester Name",
        selector: (row) => row?.requester_name,
        sortable: true,
        cell: (row) => <div className="text-lg">{row?.requester_name}</div>
      },
      {
        name: "Requester Email",
        selector: (row) => row?.requester_email,
        sortable: true,
        cell: (row) => <div className="text-lg">{row?.requester_email}</div>
      },
    ];
  
    const customStyles = {
      cells: {
        style: {
          fontSize: "16px", 
          padding: '10px 15px',
          borderBottom: '1px solid #ddd',
        },
      },
      headCells: {
        style: {
          backgroundColor: "#f9fafb", // Light gray background for header
          fontWeight: "bold",
        },
      },
    };
  
    if (isLoading) {
      return (
        <div className="flex items-center justify-center min-h-[60vh]">
          <Spinner className="h-10 w-10 text-green-600" />
        </div>
      );
    }
  
    return (
      <section className="template-container py-12 bg-gray-100">
        <div className="text-center mb-6">
          <SectionTitle sectionTitle={"Pending Requests"} />
        </div>
        <div className="w-full lg:w-2/3 mx-auto">
          {filteredRequestedAssets?.length < 1 ? (
            <div className="flex flex-col items-center justify-center bg-white p-8 rounded-lg shadow-md ">
              {/* <img 
                src="https://i.ibb.co.com/Ln7MPkL/file-not-found-illustration-with-confused-people-holding-big-magnifier-search-no-result-data-not-fou.jpg" 
                alt="No Requests" 
                className="w-72  mb-4"
              /> */}
              <Nothing />
              <p className="text-xl text-orange-600 ">No Pending Requests to Display</p>
              <p className="text-red-300">You Have 0 Pending Request.</p>
            </div>
          ) : (
            <DataTable
              columns={columns}
              data={filteredRequestedAssets.slice(0, 5)}
              pagination={filteredRequestedAssets.length > 5}
              highlightOnHover
              customStyles={customStyles}
              className="rounded-lg shadow-md bg-white"
            />
          )}
        </div>
      </section>
    );
  }
  
export default PendingRequestsInHome;
