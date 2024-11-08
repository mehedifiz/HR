import axios from "axios";

const axiosPublic = axios.create({
  baseURL: "http://localhost:2000",
});

function useAxiosPublic() {
  return axiosPublic;
}

export default useAxiosPublic;
