import { ListItemSuffix, Spinner } from "@material-tailwind/react";
import SectionTitle from "../sectionTitle/SectionTitle";
import useFilteredRequestedAssets from "../../hooks/useFilteredRequestedAssets";
import DataTable from "react-data-table-component";
import Nothing from "../../svgs/Nothing";
import Lists from "../../svgs/Lists";

function PendingRequests() {
  const { requestedAssets, isLoading } = useFilteredRequestedAssets();
  const myPendingRequestedAssets = requestedAssets.filter(
    (asset) => asset.status === "Pending"
  );

  const columns = [
    {
      name: "#",
      cell: (row, index) => <div>{index + 1}</div>,
    },
    {
      name: "Asset Name",
      selector: (row) => row.asset_name,
      sortable: true,
    },
    {
      name: "Request Date",
      selector: (row) => new Date(row.request_date).toLocaleDateString(),
      sortable: true,
    },
  ];

  const customStyles = {
    rows: {
      style: {
        minHeight: "60px", // Increase row height
      },
    },
    cells: {
      style: {
        fontSize: "16px",
      },
    },
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <Spinner />
      </div>
    );
  }

  return (
    <section className="container mx-auto py-8">
      <div className="text-center">
        <SectionTitle sectionTitle={"My Pending Requests"} />
      </div>

      <div className="mt-6">
        {myPendingRequestedAssets.length === 0 ? (
          <div className="flex flex-col items-center space-y-4 text-center text-gray-500">
            <Nothing className="w-32 h-32 text-gray-300" />
            <p className="text-lg font-semibold text-red-500">
              No Pending Requests Found
            </p>
            <p className="text-gray-400 max-w-md">
              You currently have no pending asset requests. Once you submit a request, it will appear here for easy tracking.
            </p>
          </div>
        ) : (<div className="flex flex-col items-center space-y-4 text-center text-gray-500">
          <Lists/>
          
          <DataTable
            columns={columns}
            data={myPendingRequestedAssets}
            pagination
            highlightOnHover
            customStyles={customStyles}
          />
         </div>)
        }
      </div>
    </section>
  );
}

export default PendingRequests;
