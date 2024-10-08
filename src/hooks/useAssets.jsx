
import useAxiosPublic from './useAxiosPublic';
import { useQuery } from '@tanstack/react-query';
import useCurrentUser from './useCurrentUser';

const useAssets = () => {
    const axiosPublic = useAxiosPublic();
    const [currentUser] = useCurrentUser();
  
  const {data: assets = [], isPending: loading, refetch} = useQuery({
    queryKey: 'assets',
    enabled: !!currentUser?.email, 
    queryFn: async ()=>{
      const res = await axiosPublic.get(`/assets/${currentUser?.email}`);
      return res.data;
    }
  })


  return [assets, loading, refetch]
};

export default useAssets;