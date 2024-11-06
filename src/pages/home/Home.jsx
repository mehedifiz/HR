import { Spinner } from "@material-tailwind/react";
import useAuth from "../../hooks/useAuth";
import useEmployee from "../../hooks/useEmployee";
import useHR from "../../hooks/useHr";
import useUserData from "../../hooks/useUserData";
import PageTitle from "../../components/pageTitle/PageTitle";
import About from "./about/About";
import Slider from "./slider/Slider";
import Package from "./package/Package";
import PendingRequests from "../../components/pending/PendingRequests";
import MonthlyRequests from "../../components/monthly/MonthlyRequests";
import NoticeBoard from "../../components/notice/NoticeBoard";
import PendingRequestsInHome from "../../components/hr-home/PendingRequestsInHome";
import TopRequestedItems from "../../components/hr-home/TopRequestedItems";
import LimitedStock from "../../components/hr-home/LimitedStock";
import HRChart from "../../components/hr-home/HRChart";
import ExtraSections from "../../components/hr-home/ExtraSections";

function Home() {
  const { user } = useAuth();
  const { isEmployee } = useEmployee();
  const { isHR } = useHR();
  const { userData, isLoading } = useUserData();
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <Spinner />
      </div>
    );
  }

  return (
    <>
      <PageTitle title={"Home"} />
      {!user && (
        <>
          <Slider></Slider>
          <About></About>
          <Package></Package>
        </>
      )}

      {isEmployee && (
        <>
          {!userData?.company_name ? (
            <h2 className="text-center font-bold text-red-400 text-2xl mt-20">
              Contact with your HR
            </h2>
          ) : (
            <>
              <PendingRequests />
              <MonthlyRequests />
              <NoticeBoard />
            </>
          )}
        </>
      )}

      {isHR && (
        <>
          <PendingRequestsInHome />
          <TopRequestedItems />
          <LimitedStock />
          <HRChart />
          
        </>
      )}
    </>
  );
}

export default Home;
