import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import useAxiosPublic from "./useAxiosPublic";

const useUserData = () => {
  const { user } = useAuth();
  const axiosPublic = useAxiosPublic();

  const {
    data: userData = {},
    isLoading,
    refetch,
    isError,
    error,
  } = useQuery({
    queryKey: ["userData", user?.email],
    queryFn: async () => {
      if (user?.email) {
        const response = await axiosPublic.get(`/users/${user?.email}`);
        return response.data;
      }
      return {}; // Empty object if no email
    },
    enabled: !!user?.email, // Fetch only if user email is available
    onError: (err) => {
      console.log("Error fetching user data:", err);
    },
  });

  console.log("Data in useUserData:", userData, "isLoading:", isLoading);
  return { userData, isLoading, refetch, isError, error };
};

export default useUserData;
