import useRole from "../../hooks/useRole";
import About from "./about/About";
import Banner from "./banner/Banner";
import Package from "./package/Package";
import PendingRequest from "./pendingReq.jsx/PendingRequest";

const Home = () => {
  const [role] = useRole();
  return (
    <div className="min-h-screen">
      {role === "default" && (
        <>
          <Banner></Banner>
          <About></About>
          <Package></Package>
        </>
      )}
      {role === "hr" && (
        <>
          <PendingRequest></PendingRequest>
          <Package></Package>
        </>
      )}
    </div>
  );
};

export default Home;
