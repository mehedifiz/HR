import DataTable from "react-data-table-component";
import SectionTitle from "../sectionTitle/SectionTitle";
import { Spinner } from "@material-tailwind/react";
import useRequestedAssets from "../../hooks/useRequestedAssets";
import useUserData from "../../hooks/useUserData";
import { FaRegSadCry, FaStar } from "react-icons/fa";
import Populer from "../../svgs/Populer";

function TopRequestedItems() {
    const { userData } = useUserData();
    const { requestedAssets, isLoading } = useRequestedAssets();
  
    const filteredRequestedAssets = requestedAssets.filter(
      (asset) => asset.requester_company === userData?.company_name
    );
  
    const assetCounts = filteredRequestedAssets.reduce((counts, asset) => {
      counts[asset.asset_name] = (counts[asset.asset_name] || 0) + 1;
      return counts;
    }, {});
  
    const sortedAssetCounts = Object.entries(assetCounts)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 4);
  
    const columns = [
      {
        name: "#",
        cell: (row, index) => <div>{index + 1}</div>,
      },
      {
        name: "Asset Name",
        selector: (row) => row[0],
        sortable: true,
      },
      {
        name: "Request Count",
        selector: (row) => row[1],
        sortable: true,
      },
    ];
  
    // Custom styles for the table
    const customStyles = {
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
      <section className="template-container py-8">
        {/* Image and Heading Section */}
        <div className="flex flex-col items-center justify-center  p-8 rounded-lg shadow-md ">
          {/* <img
            src="https://static.vecteezy.com/system/resources/previews/022/153/682/large_2x/technical-analysis-candlestick-chart-global-stock-market-indices-trading-exchanges-people-who-trade-stocks-buy-and-sell-stocks-with-a-mobile-app-forex-trading-strategy-investing-in-stocks-vector.jpg"
            alt="Trading Analysis Background"
            className="mx-auto w-52 mb-4 rounded-lg shadow-lg"
          /> */}
          <Populer/>
          <div className="flex justify-center items-center space-x-2 my-4">
            <FaStar className="text-yellow-500 text-2xl" />
            <SectionTitle sectionTitle="Top Most Requested Items" />
            <FaStar className="text-yellow-500 text-2xl" />
          </div>
        

        {/* Introductory Text */}
        <p className="text-center text-gray-600 px-36 mb-6">
          Here are the most frequently requested items from your company. This list highlights the top assets <br /> that have been in high demand, offering insights into your organization's key requirements.
        </p>
      
        {/* Table Container */}
        <div className="w-full lg:w-2/3 mx-auto">
          {sortedAssetCounts.length < 1 ? (
            <p className="text-center text-red-400 my-2 flex items-center justify-center space-x-2">
              <FaRegSadCry className="text-red-400 text-2xl" />
              <span>No Requested Items Found</span>
            </p>
          ) : (
            <DataTable
              columns={columns}
              data={sortedAssetCounts}
              pagination={false}
              highlightOnHover
              customStyles={{
                rows: {
                  style: {
                    backgroundColor: "rgba(255, 235, 238, 0.5)",  
                    '&:hover': {
                      backgroundColor: "rgba(255, 205, 210, 0.8)", 
                    },
                  },
                },
                headCells: {
                  style: {
                    backgroundColor: "rgba(255, 87, 34, 0.8)",  
                    color: "#fff",
                    fontWeight: "bold",
                    fontSize: "16px",
                    padding: "12px",
                  },
                },
                cells: {
                  style: {
                    padding: "10px",
                    fontSize: "15px",
                    color: "#37474F", 
                  },
                },
              }}
            />
          )}
        </div>
        </div>
      </section>
    );
}
  
export default TopRequestedItems;
