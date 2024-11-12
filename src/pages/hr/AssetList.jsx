import DataTable from "react-data-table-component";
import SectionTitle from "../../components/sectionTitle/SectionTitle";
import PrimaryButton from "../../components/buttons/PrimaryButton";
import { Link } from "react-router-dom";
import PageTitle from "../../components/pageTitle/PageTitle";
import { useMemo, useState } from "react";
import Swal from "sweetalert2";
import useDeleteAsset from "./../../hooks/useDeleteAsset";
import useAssets from "./../../hooks/useAssets";
import useUserData from "../../hooks/useUserData";
import { FaDeleteLeft, FaTrash } from "react-icons/fa6";
import { MdUpdate } from "react-icons/md";

function AssetList() {
  const { userData } = useUserData();
  const { assets, refetch } = useAssets();
  const deleteAsset = useDeleteAsset(refetch);

  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState("");
  const [sort, setSort] = useState("");

  const formatDate = (dateString) => {
    const options = { day: "2-digit", month: "2-digit", year: "numeric" };
    const date = new Date(dateString);
    return date.toLocaleDateString(undefined, options);
  };

  const handleDelete = (assetId) => {
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
        deleteAsset.mutate(assetId, {
          onSuccess: () => {
            Swal.fire({
              title: "Deleted!",
              text: "Your asset has been deleted.",
              icon: "success",
            });
            refetch(); 
          },
          onError: () => {
            Swal.fire({
              title: "Error!",
              text: "There was a problem deleting the asset.",
              icon: "error",
            });
          },
        });
      }
    });
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    console.log(e.target.value)
  };

  const handleFilter = (e) => {
    setFilter(e.target.value);
  };

  const handleSort = (e) => {
    setSort(e.target.value);
  };

  const filteredAssets = useMemo(() => {
    let filtered = assets;
  
    // Check if the user data is available and filter based on company name
    if (userData?.company_name) {
      filtered = filtered.filter(
        (asset) => asset.company_name === userData.company_name
      );
    }
  
    // Apply search filter
    if (searchTerm) {
      filtered = filtered.filter((asset) =>
        asset.product_name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
  
    // Apply other filters like Available, Out of Stock, etc.
    if (filter) {
      if (filter === "Available") {
        filtered = filtered.filter((asset) => asset.product_quantity > 0);
      } else if (filter === "Out Of Stock") {
        filtered = filtered.filter((asset) => asset.product_quantity === 0);
      } else if (filter === "Returnable") {
        filtered = filtered.filter(
          (asset) => asset.product_type === "Returnable"
        );
      } else if (filter === "Non-Returnable") {
        filtered = filtered.filter(
          (asset) => asset.product_type === "Non-Returnable"
        );
      }
    }
  
    // Sort functionality (if needed)
    if (sort) {
      if (sort === "1 To 10") {
        filtered = filtered.filter(
          (asset) => asset.product_quantity >= 1 && asset.product_quantity <= 10
        );
      } else if (sort === "10 To 20") {
        filtered = filtered.filter(
          (asset) => asset.product_quantity > 10 && asset.product_quantity <= 20
        );
      } else if (sort === "20 To 30") {
        filtered = filtered.filter(
          (asset) => asset.product_quantity > 20 && asset.product_quantity <= 30
        );
      }
    }
  
    return filtered;
  }, [assets, searchTerm, filter, sort, userData?.company_name]);
  

  const columns = [
    {
      name: "#",
      cell: (row, index) => <div>{index + 1}</div>,
    },
    {
      name: "Product Name",
      selector: (row) => row.product_name,
      sortable: true,
    },
    {
      name: "Product Type",
      selector: (row) => row.product_type,
      sortable: true,
    },
    {
      name: "Product Quantity",
      selector: (row) => row.product_quantity,
      sortable: true,
    },
    {
      name: "Date Added",
      selector: (row) => formatDate(row.created_date),
      sortable: true,
    },
    {
      name: "Action",
      cell: (row) => (
        <div className="flex justify-center items-center gap-1 flex-wrap">
          <Link
            to={`/edit-asset/${row._id}`}
            type="button"
            className="p-2 rounded-md bg-primary text-white text-lg"
          >
            <MdUpdate/>
          </Link>
          <button
            type="button"
            onClick={() => handleDelete(row._id)}
            className="p-2 rounded-md bg-red-700 text-white text-lg"
          >
           <FaTrash/>
          </button>
        </div>
      ),
    },
  ];

  return (
    <section className="py-8 bg-gray-100 shadow-sm">
    <PageTitle title={"Asset List"} />
    
    {!userData?.payment_status ? (
      <div className="text-center bg-white p-6 rounded-lg shadow-lg max-w-2xl mx-auto">
        <p className="text-red-600 font-bold text-2xl mb-4">
          You Need To Pay First
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
      <div className="container mx-auto mt-8">
        <div className="text-center mb-8">
          <SectionTitle sectionTitle={"Asset List"} />
        </div>
  
        <div className="flex flex-col lg:flex-row gap-6 items-center justify-between mb-8">
          {/* Search Input */}
          <div className="w-full max-w-sm">
            <input
              type="text"
              value={searchTerm}
              onChange={handleSearch}
              placeholder="Search Item By Asset Name"
              className="w-full p-3 rounded-md border border-gray-300 text-lg focus:ring-primary focus:ring-2"
            />
          </div>
  
          {/* Filter Dropdown */}
          <div className="w-full max-w-sm">
            <select
              className="w-full p-3 rounded-md bg-gray-200 text-primary font-semibold text-lg focus:ring-primary focus:ring-2"
              onChange={handleFilter}
              value={filter}
            >
              <option value="">Filter Assets</option>
              <option value="Available">Available</option>
              <option value="Out Of Stock">Out Of Stock</option>
              <option value="Returnable">Returnable</option>
              <option value="Non-Returnable">Non-Returnable</option>
            </select>
          </div>
  
          {/* Sort Dropdown */}
          <div className="w-full max-w-sm">
            <select
              className="w-full p-3 rounded-md bg-gray-200 text-primary font-semibold text-lg focus:ring-primary focus:ring-2"
              onChange={handleSort}
              value={sort}
            >
              <option value="">Sort Assets By Quantity</option>
              <option value="1 To 10">1 To 10</option>
              <option value="10 To 20">10 To 20</option>
              <option value="20 To 30">20 To 30</option>
            </select>
          </div>
        </div>
  
        {/* Data Table */}
        <div className="mt-8">
          <DataTable
            columns={columns}
            data={filteredAssets}
            pagination
            highlightOnHover
            className="rounded-lg overflow-hidden shadow-lg"
          />
        </div>
      </div>
    )}
  </section>
  
  );
}

export default AssetList;
