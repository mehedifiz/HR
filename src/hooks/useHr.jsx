import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import useAxiosPublic from "./useAxiosPublic";

function useHR() {
    const { user } = useAuth();
    const axiosPublic = useAxiosPublic();
    const { data: isHR, isPending: isHRLoading } = useQuery({
      queryKey: [user?.email, "hr"],
      enabled: !!user?.email && !!localStorage.getItem("access-token"),
      queryFn: async () => {
        const res = await axiosPublic.get(`/users/hr/${user?.email}`);
        return res.data?.hr;
      },
    });
    return { isHR, isHRLoading };
  }
  
  export default useHR;