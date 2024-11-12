import { TiPin } from "react-icons/ti"; 
import SectionTitle from "../sectionTitle/SectionTitle";
import useUserData from "../../hooks/useUserData";
import Notice from "../../svgs/Notice";

function NoticeBoard() {
  const { userData } = useUserData();
  const companyName = userData?.company_name || "Our Company";

  return (
    <section className="container mx-auto pb-8">
      <div className="text-center mb-6">
        <SectionTitle sectionTitle="Notice Board" />
      </div>
      <div className="relative bg-gradient-to-r from-blue-500 to-purple-500 text-white p-8 rounded-lg shadow-lg space-y-6">
        {/* Notice SVG at the top */}
        <div className="flex justify-center mb-4">
          <Notice className="w-12 h-12 text-white" /> {/* Notice SVG */}
        </div>
        
        {/* Notice Content */}
        <h1 className="text-center text-2xl font-bold">
          <strong>Attention All Employees</strong>
        </h1>
        <p className="text-center lg:w-3/6 md:w-5/6 w-full md:px-0 px-2 mx-auto font-roboto">
          We are pleased to announce an important update. Starting from <strong>1st December 2024</strong>, our company will be implementing new initiatives focused on employee growth and professional development. These initiatives include skill-building workshops, wellness programs, and team-building activities. Stay tuned for more details!
        </p>
        
        {/* Closing Message */}
        <div className="text-center">
          <p className="text-lg font-semibold">
            Thank you for your dedication and commitment!
          </p>
          <p className="mt-4 font-roboto text-lg">
            <TiPin className="inline text-2xl mr-1" /> <strong>Best Regards,</strong>
          </p>
          <p className="font-roboto text-lg">{companyName}</p>
        </div>
      </div>
    </section>
  );
}

export default NoticeBoard;
