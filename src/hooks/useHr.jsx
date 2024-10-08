import { useContext } from "react";
import { AuthContext } from "../providers/AuthProvider";
import useAxiosSecure from "./useAxiosSecure";
import { useQuery } from "@tanstack/react-query";

const useHR = () => {
    const { user } = useContext(AuthContext);
    const axiosSecure = useAxiosSecure();

    const { data: isHR, isPending: isHRLoading } = useQuery({
        queryKey: [user?.email, 'isHR'],
        queryFn: async () => {
            const res = await axiosSecure.get(`/user/hr/${user?.email}`);
            console.log(res.data);
            return res.data?.isHR;
        }
    });

    return [isHR, isHRLoading];
};

export default useHR;