import axios from "axios";

const axiosPublic = axios.create({
  baseURL: "https://assetmanage-server.onrender.com",
  
});

function useAxiosPublic() {
  return axiosPublic;
}

export default useAxiosPublic;
