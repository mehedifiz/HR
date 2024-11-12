import DataTable from "react-data-table-component";
import SectionTitle from "../../components/sectionTitle/SectionTitle";
import PageTitle from "../../components/pageTitle/PageTitle";
import { Spinner } from "@material-tailwind/react";
import useUsersByCompany from "../../hooks/useUsersByCompany";
import Nothing from "../../svgs/Nothing";

function MyTeam() {
  const { usersByCompany, isLoading } = useUsersByCompany();

  // Check for loading state
  if (isLoading) {
    return (
      <div className="flex justify-center mt-5">
        <Spinner />
      </div>
    );
  }

  // Define DataTable columns
  const columns = [
    {
      name: "#",
      cell: (row, index) => <div>{index + 1}</div>,
    },
    {
      name: "Member Image",
      selector: (row) => (
        <img
          src={
            row?.profile_image
              ? row.profile_image
              : "https://upload.wikimedia.org/wikipedia/commons/thumb/2/24/Missing_avatar.svg/2048px-Missing_avatar.svg.png"
          }
          alt="Image"
          className="h-[100px] w-[100px] object-cover rounded my-2"
        />
      ),
      sortable: true,
    },
    {
      name: "Member Name",
      selector: (row) => row?.name,
      sortable: true,
    },
    {
      name: "Member Type",
      selector: (row) => <p className="capitalize">{row.role}</p>,
      sortable: true,
    },
  ];

  // If no team members are available, show a friendly message
  if (usersByCompany.length === 0) {
    return (
      <section className="py-16 flex flex-col items-center text-center">
        <Nothing className="w-24 h-24 text-gray-400" />
        <h2 className="font-bold text-gray-600 text-2xl mt-4">
          No Team Members Found
        </h2>
        <p className="text-gray-500 mt-2 max-w-lg">
          It appears that you currently don’t have any team members in your
          company. Please contact your administrator to ensure your company’s
          team members are correctly listed here.
        </p>
      </section>
    );
  }

  // Main content with data table if data exists
  return (
    <section className="py-8">
      <PageTitle title="My Team" />
      <div className="container mx-auto">
        <div className="text-center">
          <SectionTitle sectionTitle="My Team" />
          <div className=" mt-4 bg-[#bfe8b3] p-6 rounded-lg shadow-lg">
            <DataTable
              columns={columns}
              data={usersByCompany}
              pagination
              highlightOnHover
              noDataComponent={<Nothing />} 
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
      </div>
    </section>
  );
}

export default MyTeam;
