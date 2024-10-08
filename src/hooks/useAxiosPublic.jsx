import axios from "axios";

const axiosPublic = axios.create({
  baseURL: 'https://asset-server-mu.vercel.app',
});

function useAxiosPublic() {
  return axiosPublic;
}

export default useAxiosPublic;