import React from "react";
import useAssets from "../../hooks/useAssets";
import { Link } from "react-router-dom";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import Swal from "sweetalert2";
import useAxiosPublic from "../../hooks/useAxiosPublic";

const AssetList = () => {
  const axiosPublic = useAxiosPublic();
  const [assets, loading, refetch] = useAssets();
  console.log(assets);
  const handleDelete = (asset) => {
    console.log(asset);
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        // Swal.fire({
        //   title: "Deleted!",
        //   text: "Your file has been deleted.",
        //   icon: "success",
        // });
        axiosPublic.delete(`/asset/${asset._id}`).then((res) => {
          if (res.data.deletedCount > 0) {
            Swal.fire({
              title: "Deleted!",
              text: `${asset.name} has been deleted.`,
              icon: "success",
            });
            refetch();
          }
        });
      }
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <div className="animate-spin h-12 w-12 rounded-full border-t-4 border-b-4 border-blue-600"></div>
      </div>
    );
  }
  if (assets.length <= 0) {
    return (
      <div className="min-h-screen w-full border flex justify-center items-center font-bold text-primary">
        <Link className="hover:underline" to="/add-asset">
          Please Add Assets
        </Link>
      </div>
    );
  }
  return (
    <div className="min-h-screen container mx-auto py-12">
      <div>
        <h1>Total Assets: {assets.length}</h1>
      </div>

      <div className="overflow-x-auto">
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th className="font-roboto font-bold text-black text-lg">#</th>
              <th className="font-roboto font-bold text-black text-lg">Product Name</th>
              <th className="font-roboto font-bold text-black text-lg">Product Type</th>
              <th className="font-roboto font-bold text-black text-lg">Product Quantity</th>
              <th className="font-roboto font-bold text-black text-lg">Date Of Addition</th>
              <th className="font-roboto font-bold text-black text-lg">Action</th>
              <th className="font-roboto font-bold text-black text-lg">Action</th>
            </tr>
          </thead>

          <tbody>
            {assets.map((asset, idx) => (
              <tr className="hover:bg-gray-100 hover:border-b hover:border-b-gray-300" key={asset._id}>
                <th className="font-lato font-bold">{idx + 1}</th>
                <td className="font-lato font-bold">{asset.name}</td>
                <td>
                  <button
                    className={`px-3 py-1 font-lato font-bold rounded-full ${
                      asset.type === "Returnable"
                        ? "bg-blue-100 text-primary"
                        : "bg-orange-100 text-orange-600"
                    }`}
                  >
                    {asset.type}
                  </button>
                </td>
                <td className="font-lato font-bold">{asset.quantity}</td>
                <td className="font-lato font-bold">{asset.date}</td>
                <td>
                  <Link to={`/update-asset/${asset._id}`}>
                    <button>
                      <FaEdit className="text-lg text-primary"></FaEdit>
                    </button>
                  </Link>
                </td>
                <td>
                  <Link>
                    <button onClick={() => handleDelete(asset)}>
                      <FaTrashAlt className="text-lg text-red-500"></FaTrashAlt>
                    </button>
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AssetList;
