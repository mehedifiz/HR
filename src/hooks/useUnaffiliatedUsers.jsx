import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";

function useUnaffiliatedUsers() {
    const axiosSecure = useAxiosSecure();
    const {
      data: unaffiliatedUsers = [],
      isLoading,
      refetch,
      isError,
      error,
    } = useQuery({
      queryKey: ["unaffiliatedUsers"],
      queryFn: async () => {
        const response = await axiosSecure.get("/users");
        // Filter users where company_name is not present
        const unaffiliatedData = response.data.filter(
          (user) => !user.company_name
        );
        return unaffiliatedData;
      },
    });
  
    return { unaffiliatedUsers, isLoading, refetch, isError, error };
  }
  
  export default useUnaffiliatedUsers;