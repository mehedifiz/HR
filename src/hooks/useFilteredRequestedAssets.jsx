import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";
import useUserData from "./useUserData";

function useFilteredRequestedAssets() {
    const axiosSecure = useAxiosSecure();
    const { userData, isLoading: isUserDataLoading } = useUserData();
  
    const {
      data: requestedAssets = [],
      isLoading,
      refetch,
      isError,
      error,
    } = useQuery({
      queryKey: ["userRequestedAssets", userData?.email],
      queryFn: async ({ queryKey }) => {
        const [, email] = queryKey;
        const params = {
          email,
        };
        const response = await axiosSecure.get("/filtered-requested-assets", {
          params,
        });
        return response.data;
      },
      enabled: !!userData?.email,
    });
  
    return {
      requestedAssets,
      isLoading,
      refetch,
      isError,
      error,
      isUserDataLoading,
    };
  }
  
  export default useFilteredRequestedAssets;