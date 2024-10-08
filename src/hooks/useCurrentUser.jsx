import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "./useAxiosPublic";
import { useContext } from "react";
import { AuthContext } from "../providers/AuthProvider";

const useCurrentUser = () => {
    const axiosPublic = useAxiosPublic();
    const {user} = useContext(AuthContext);
    const {
      data: currentUser = [],
      isPending: loading,
      refetch,
    } = useQuery({
      queryKey: "currentUser",
      queryFn: async () => {
        const res = await axiosPublic.get(`/user/${user.email}`);
        return res.data;
      },
    });
  
    return [currentUser, loading, refetch];
  };
  
  export default useCurrentUser;