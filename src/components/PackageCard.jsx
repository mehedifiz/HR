import { useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";

 
  

const PackageCard = ({ employees, price }) => {
  const navigate = useNavigate()

  const {user}= useAuth()
  const handeUser = e =>{
    if(!user){
      return navigate('/login')
      
    }
  }
  return (
    <div className="bg-white shadow-lg rounded-lg flex flex-col items-center text-center p-8 w-full lg:w-72 border border-gray-200 transform hover:scale-105 transition-transform duration-300 ease-in-out">
      <h2 className="text-3xl font-bold text-blue-700 mb-4">{employees} Employees</h2>
      <p className="text-5xl font-extrabold text-green-500 mb-6">${price}</p>
      <p className="text-gray-600 mb-8">
        Perfect for small teams looking to manage assets efficiently and affordably.
      </p>
      <button onClick={()=>handeUser()} className="bg-blue-700 text-white font-semibold py-2 px-8 rounded-lg hover:bg-blue-800 transition">
        Choose Plan
      </button>
    </div>
  );
};

export default PackageCard;
