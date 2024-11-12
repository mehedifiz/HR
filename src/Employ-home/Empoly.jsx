import useUserData from "../hooks/useUserData";
import Contract from "../svgs/Contract";

const EmployeeHomePage = () => {
    const {userData} = useUserData();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-center bg-gray-100 p-8">
      {!userData?.company_name ? (
        <div className="flex flex-col items-center gap-4">
          <Contract className="w-24 h-24 text-red-400" /> 
          <h2 className="font-bold text-red-500 text-2xl mt-4">
            It looks like you're not connected to a company yet.
          </h2>
          <p className="text-gray-600 text-lg mt-2 max-w-lg">
            To get started with our platform, please reach out to your HR representative for assistance. 
            Once you're added to your company’s network, you’ll have access to all the features and resources available to employees.
          </p>
          <button
            className="mt-6 px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition duration-200"
            onClick={() => {
              // Optional: Action to contact HR, open email, etc.
            }}
          >
            Contact HR Support
          </button>
        </div>
      ) : (
        <h2 className="text-center font-bold text-green-500 text-2xl mt-20">
          Welcome to {userData.company_name}!
        </h2>
      )}
    </div>
  );
};

export default EmployeeHomePage;
