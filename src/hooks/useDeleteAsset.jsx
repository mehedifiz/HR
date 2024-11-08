import { useMutation } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";
import useUserData from "./useUserData";
import useAxiosPublic from "./useAxiosPublic";

function useDeleteAsset(refetch) {
    const axiosSecure = useAxiosPublic();
    const { userData } = useUserData();
  
    const mutation = useMutation({
      mutationFn: async (id) => {
        const config = {
          headers: {
            Authorization: `Bearer ${userData?.token}`,
          },
        };
        const response = await axiosSecure.delete(`/assets/${id}`, config);
        return response.data;
      },
      onSuccess: () => {
        refetch();
      },
    });
  
    return mutation;
  }
  
  export default useDeleteAsset;