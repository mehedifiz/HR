import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";

function useUsers() {
    const axiosSecure = useAxiosSecure();
  
    const {
      data: users = [],
      isLoading,
      refetch,
      isError,
      error,
    } = useQuery({
      queryKey: ["users"],
      queryFn: async () => {
        const response = await axiosSecure.get("/users");
        return response.data;
      },
    });
  
    return { users, isLoading, refetch, isError, error };
  }
  
  export default useUsers;