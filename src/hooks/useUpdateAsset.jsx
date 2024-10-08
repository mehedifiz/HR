import { useMutation } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";
import useUserData from "./useUserData";

function useUpdateAsset(refetch) {
    const axiosSecure = useAxiosSecure();
    const { userData } = useUserData();
  
    const mutation = useMutation({
      mutationFn: async ({ id, data }) => {
        const config = {
          headers: {
            Authorization: `Bearer ${userData?.token}`,
          },
        };
        const response = await axiosSecure.put(`/assets/${id}`, data, config);
        return response.data;
      },
      onSuccess: () => {
        refetch();
      },
    });
  
    return mutation;
  }
  
  export default useUpdateAsset;