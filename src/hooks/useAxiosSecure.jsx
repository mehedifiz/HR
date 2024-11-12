import axios from "axios";
import { useNavigate } from "react-router-dom";
import useAuth from "./useAuth";

const axiosSecure = axios.create({
  baseURL: 'https://assetmanage-server.onrender.com',
});

function useAxiosSecure() {
  const navigate = useNavigate();
  const { logOut } = useAuth();

  axiosSecure.interceptors.request.use(
    function (config) {
      const token = localStorage.getItem("access-token");
        console.log("interceptor", token);
      config.headers.authorization = `Bearer ${token}`;
      return config;
    },
    function (error) {
      return Promise.reject(error);
    }
  );

  axiosSecure.interceptors.response.use(
    function (response) {
      return response;
    },
    async (error) => {
      const status = error.response.status;
      console.log("Status Error", status);
      await logOut();
      navigate("/login");
      return Promise.reject(error);
    }
  );

  return axiosSecure;
}

export default useAxiosSecure;