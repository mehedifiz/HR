import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "./useAxiosPublic";
import useAuth from "./useAuth";
import useAxiosSecure from "./useAxiosSecure";

function useAssets() {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();

  console.log("User Email in frontend:", user?.email);
  const {
    data: assets = [],
    isLoading,
    refetch,
    isError,
    error,
  } = useQuery({
    queryKey: ["assets", user?.email],
    queryFn: async () => {
      if (!user?.email) {
        throw new Error("User email is not available");
      }

      const response = await axiosSecure.get(
        `/assets?userEmail=${user?.email}`
      );
      return response.data;
    },
  });

  return { assets, isLoading, refetch, isError, error };
}

export default useAssets;
