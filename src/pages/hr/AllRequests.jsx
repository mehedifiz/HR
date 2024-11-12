import SectionTitle from "../../components/sectionTitle/SectionTitle";
import PrimaryButton from "../../components/buttons/PrimaryButton";
import { Link } from "react-router-dom";
import PageTitle from "../../components/pageTitle/PageTitle";
import { Spinner } from "@material-tailwind/react";
import Swal from "sweetalert2";
import useRequestedAssets from "../../hooks/useRequestedAssets";
import { useState } from "react";
import useUserData from "../../hooks/useUserData";
import useAxiosSecure from "../../hooks/useAxiosSecure";

function AllRequests() {
  const { userData } = useUserData();
  const [searchTerm, setSearchTerm] = useState("");
  const { requestedAssets, refetch, isLoading } = useRequestedAssets();
  const axiosSecure = useAxiosSecure();

  let filtered = requestedAssets.filter(
    (requestedAsset) =>
      requestedAsset.requester_name
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      requestedAsset.requester_email
        .toLowerCase()
        .includes(searchTerm.toLowerCase())
  );

  if (userData?.company_name) {
    filtered = filtered.filter(
      (requestedAsset) =>
        requestedAsset.requester_company === userData.company_name
    );
  }

  const formatDate = (dateString) => {
    const options = { day: "2-digit", month: "2-digit", year: "numeric" };
    const date = new Date(dateString);
    return date.toLocaleDateString(undefined, options);
  };

  const handleAction = async (row, status) => {
    try {
      const updateData = { status };
      if (status === "Approved") {
        updateData.approval_date = new Date();
      }

      const response = await axiosSecure.put(
        `/requested-assets/${row._id}`,
        updateData
      );
      if (response.data.modifiedCount > 0) {
        Swal.fire({
          icon: "success",
          title: `Request ${status}`,
          showConfirmButton: false,
          timer: 1500,
        });
        refetch();
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: error.message,
      });
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center mt-5">
        <Spinner />
      </div>
    );
  }

  return (
    <section className="py-8">
      <PageTitle title={"All Requests"} />
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
            <SectionTitle sectionTitle={"All Requests"} />
          </div>
          <div className="w-full max-w-[320px] relative mb-8">
            <input
              type="text"
              className="p-2 rounded-md border border-blue-700 w-full"
              placeholder="Search By Name/Email"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          {/* DaisyUI Table */}
          <div className="overflow-x-auto">
            <table className="table table-zebra w-full">
              {/* Table Head */}
              <thead>
                <tr>
                  <th></th>
                  <th>Asset Name</th>
                  <th>Asset Type</th>
                  <th>Email of Requester</th>
                  <th>Name of Requester</th>
                  <th>Request Date</th>
                  <th>Additional Note</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>
              {/* Table Body */}
              <tbody>
                {filtered.map((requestedAsset, index) => (
                  <tr key={requestedAsset._id}>
                    <th>{index + 1}</th>
                    <td>{requestedAsset.asset_name}</td>
                    <td>{requestedAsset.asset_type}</td>
                    <td>{requestedAsset.requester_email}</td>
                    <td>{requestedAsset.requester_name}</td>
                    <td>{formatDate(requestedAsset.request_date)}</td>
                    <td>{requestedAsset.note}</td>
                    <td>{requestedAsset.status}</td>
                    <td>
                      <div className="py-2 flex justify-center items-center gap-2 flex-wrap">
                        {requestedAsset.status !== "Approved" &&
                          requestedAsset.status !== "Rejected" &&
                          requestedAsset.status !== "Cancelled" &&
                          requestedAsset.status !== "Returned" && (
                            <>
                              <button
                                type="button"
                                className="p-1 rounded-md bg-green-700 text-white text-base"
                                onClick={() => handleAction(requestedAsset, "Approved")}
                              >
                                Approve
                              </button>
                              <button
                                type="button"
                                className="p-1 rounded-md bg-red-700 text-white text-base"
                                onClick={() => handleAction(requestedAsset, "Rejected")}
                              >
                                Reject
                              </button>
                            </>
                          )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </section>
  );
}

export default AllRequests;
