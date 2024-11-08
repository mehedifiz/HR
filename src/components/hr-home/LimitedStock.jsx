import DataTable from "react-data-table-component";
import SectionTitle from "../sectionTitle/SectionTitle";
import { Spinner } from "@material-tailwind/react";  
import { FaBoxOpen, FaSadTear } from "react-icons/fa";
import useLimitedStock from "./../../hooks/useLimitedStock";
import Overview from "../../svgs/Overview";

function LimitedStock() {
  const { assets, isLoading } = useLimitedStock();

  // Column configurations with additional styles
  const columns = [
    {
      name: "#",
      cell: (row, index) => <div className="text-gray-700">{index + 1}</div>,
    },
    {
      name: "Asset Name",
      selector: (row) => row.product_name,
      sortable: true,
      cell: (row) => <span className="font-medium text-blue-700">{row.product_name}</span>,
    },
    {
      name: "Quantity",
      selector: (row) => row.product_quantity,
      sortable: true,
      cell: (row) => (
        <span className={row.product_quantity > 5 ? "text-green-600" : "text-red-600"}>
          {row.product_quantity}
        </span>
      ),
    },
  ];

  // Custom styles for the DataTable component
  const customStyles = {
    table: {
      style: {
        borderRadius: "8px",
        overflow: "hidden",
      },
    },
    headCells: {
      style: {
        backgroundColor: "#4a5568",
        color: "#ffffff",
        fontWeight: "bold",
        fontSize: "15px",
        padding: "12px",
        textAlign: "center",
      },
    },
    rows: {
      style: {
        minHeight: "50px",
        backgroundColor: "#f7fafc",
        '&:nth-child(odd)': {
          backgroundColor: "#edf2f7",
        },
        '&:hover': {
          backgroundColor: "#e2e8f0",
        },
      },
    },
    cells: {
      style: {
        fontSize: "16px",
        padding: "10px",
        textAlign: "center",
      },
    },
  };

  // Loading Spinner
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <Spinner />
      </div>
    );
  }

  return (
    <section className="template-container py-8 px-4 bg-gray-50">
      {/* Section Title */}
      <SectionTitle sectionTitle="Inventory Overview" subtitle="Track and manage assets with limited stock" />

      {/* Image and Heading */}
      <div className="text-center mb-6 flex flex-col items-center justify-center  p-8 rounded-lg shadow-md ">
        <Overview/>
        {/* <img
          src="https://i.ibb.co/t8VcYGq/vecteezy-isometric-style-illustration-of-security-cloud-data-storage-6470786.jpg"
          alt="Security Cloud Data"
          className="mx-auto w-60 rounded-lg shadow-lg mb-4"
        /> */}
        <div className="flex items-center justify-center space-x-2">
          <FaBoxOpen className="text-yellow-500 text-2xl" />
          <SectionTitle sectionTitle="Limited Stock Items" />
          <FaBoxOpen className="text-yellow-500 text-2xl" />
        </div>
      </div>

      {/* Data Table */}
      <div className="w-full lg:w-2/3 mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
        {assets?.length < 1 ? (
          <p className="text-center text-red-400 my-2 flex items-center justify-center space-x-2">
            <FaSadTear className="text-red-400 text-xl" />
            <span>No Data Found!</span>
          </p>
        ) : (
          <DataTable
            columns={columns}
            data={assets}
            pagination
            highlightOnHover
            customStyles={customStyles}
          />
        )}
      </div>
    </section>
  );
}

export default LimitedStock;
