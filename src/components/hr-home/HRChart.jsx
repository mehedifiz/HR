import { Cell, Legend, Pie, PieChart, Tooltip } from "recharts";
import SectionTitle from "../sectionTitle/SectionTitle";
import { Spinner } from "@material-tailwind/react";
import useRequestedAssets from "../../hooks/useRequestedAssets";
import useUserData from "../../hooks/useUserData";

function HRChart() {
  const { userData } = useUserData();
  const { requestedAssets, isLoading } = useRequestedAssets();

  // Display spinner during loading
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <Spinner />
      </div>
    );
  }

  // Filter assets based on user's company and check for asset type field
  const filteredRequestedAssets = requestedAssets.filter(
    (asset) => asset.requester_company === userData?.company_name
  );
  const hasAssetTypeField = filteredRequestedAssets.every(
    (asset) => "asset_type" in asset
  );

  // Display message if no assets are found with asset type field
  if (!hasAssetTypeField) {
    return <p className="text-center text-gray-600">You do not have any requested items at the moment.</p>;
  }

  // Count the number of returnable and non-returnable assets
  const assetTypeCount = filteredRequestedAssets.reduce(
    (acc, asset) => {
      if (asset.asset_type === "Returnable") {
        acc.returnable += 1;
      } else if (asset.asset_type === "Non-Returnable") {
        acc.nonReturnable += 1;
      }
      return acc;
    },
    { returnable: 0, nonReturnable: 0 }
  );

  // Pie chart data
  const data = [
    { name: "Returnable", value: assetTypeCount.returnable },
    { name: "Non-Returnable", value: assetTypeCount.nonReturnable },
  ];

  const COLORS = ["#0088FE", "#FF8042"];

  return (
    <section className="text-center py-8 px-4 bg-gray-50">
      <SectionTitle sectionTitle="Requested Assets Overview" />
      <p className="text-gray-600 mt-2 mb-6">This chart shows the breakdown of <br />your requested assets by returnability status. Use this data to quickly see which items are returnable and non-returnable.</p>
      {filteredRequestedAssets?.length < 1 ? (
        <p className="text-center text-red-500">No requested items found</p>
      ) : (
        <div className="flex justify-center">
          <PieChart width={400} height={400}>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={70}
              outerRadius={110}
              fill="#8884d8"
              paddingAngle={5}
              dataKey="value"
              label
            >
              {data.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </div>
      )}
      <div className="text-gray-500 text-sm mt-4">
        <p>Legend:</p>
        <p className="flex justify-center items-center space-x-2 mt-2">
          <span className="w-4 h-4 inline-block rounded-full bg-blue-500"></span>
          <span>Returnable Items</span>
          <span className="w-4 h-4 inline-block rounded-full bg-orange-500 ml-4"></span>
          <span>Non-Returnable Items</span>
        </p>
      </div>
    </section>
  );
}

export default HRChart;
