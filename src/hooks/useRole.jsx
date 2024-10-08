import { useContext } from "react"
import { AuthContext } from "../providers/AuthProvider"
import useAxiosPublic from "./useAxiosPublic"
import { useQuery } from "@tanstack/react-query"


const useRole = () => {
  const { user, loading } = useContext(AuthContext)
  const axiosPublic = useAxiosPublic()

  const { data: role = 'default', isLoading } = useQuery({
    queryKey: ['role', user?.email],
    enabled: !loading && !!user?.email,
    queryFn: async () => {
      const { data } = await axiosPublic(`/user/${user?.email}`)
      return data.role;
    },
  })

  //   Fetch user info using logged in user email

  return [role, isLoading]
}

export default useRole;
