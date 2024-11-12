import { Spinner } from "@material-tailwind/react";
import useFilteredRequestedAssets from "../../hooks/useFilteredRequestedAssets";
import SectionTitle from "../sectionTitle/SectionTitle";
import DataTable from "react-data-table-component";
import Nothing from "../../svgs/Nothing";
import Lists from "../../svgs/Lists";

function MonthlyRequests() {
  const { requestedAssets, isLoading } = useFilteredRequestedAssets();

  const isCurrentMonth = (date) => {
    const now = new Date();
    const requestDate = new Date(date);
    return (
      requestDate.getMonth() === now.getMonth() &&
      requestDate.getFullYear() === now.getFullYear()
    );
  };

  // Filter and sort monthly requests
  const monthlyRequestedAssets = requestedAssets
    ?.filter((asset) => isCurrentMonth(asset.request_date))
    ?.sort((a, b) => new Date(b.request_date) - new Date(a.request_date)) || [];

  // Calculate average status (or any specific average data you need)
  const averageStatus = (monthlyRequestedAssets.length > 0
    ? monthlyRequestedAssets.reduce((acc, asset) => acc + (asset.status === 'Approved' ? 1 : 0), 0) /
      monthlyRequestedAssets.length
    : 0
  ).toFixed(2);

  const columns = [
    {
      name: "#",
      cell: (row, index) => <div>{index + 1}</div>,
    },
    {
      name: "Asset Name",
      selector: (row) => row?.asset_name,
      sortable: true,
    },
    {
      name: "Status",
      selector: (row) => row?.status,
      sortable: true,
    },
    {
      name: "Requested Date",
      selector: (row) => new Date(row.request_date).toLocaleDateString(),
      sortable: true,
    },
  ];

  // Custom styles for the table
  const customStyles = {
    rows: {
      style: {
        minHeight: "60px",
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
      <div className="text-center mb-8">
        <SectionTitle sectionTitle="My Monthly Requests" />
        {monthlyRequestedAssets.length > 0 && (
          <p className="text-gray-600 text-lg">
            Average Status Approval Rate: <span className="font-semibold text-green-500">{averageStatus * 100}%</span>
          </p>
        )}
      </div>

      <div className="mt-6">
        {monthlyRequestedAssets.length === 0 ? (
          <div className="flex flex-col items-center text-center text-gray-500 space-y-4">
            <Nothing className="w-32 h-32 text-gray-300" />
            <p className="text-xl font-semibold text-red-500">No Requests Made This Month</p>
            <p className="text-gray-400 max-w-lg">
              It looks like you haven't made any asset requests this month. Once you do, they’ll appear here for easy tracking.
            </p>
          </div>
        ) : (<div className="flex flex-col items-center text-center text-gray-500 space-y-4">
          <Lists/>
          <DataTable
            columns={columns}
            data={monthlyRequestedAssets}
            pagination
            highlightOnHover
            customStyles={customStyles}
          />
        </div>)}
      </div>
    </section>
  );
}

export default MonthlyRequests;
