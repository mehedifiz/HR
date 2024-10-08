import { TiPin } from "react-icons/ti";
import SectionTitle from "../sectionTitle/SectionTitle";
import useUserData from "../../hooks/useUserData";

function NoticeBoard() {
  const { userData } = useUserData();
  console.log(userData);
  return (
    <section className="container mx-auto pb-8">
      <div className="text-center">
        <SectionTitle sectionTitle={"Notice"} />
      </div>
      <div className="py-8 bg-primary text-white space-y-4">
        <h1 className="text-center"><strong>Dear Valued Employees,</strong></h1>
        <p className="lg:w-3/6 md:w-5/6 w-full md:px-0 px-2 mx-auto text-center font-roboto">
          Please be informed that our office will be closed for the next 7 days
          in observance of Eid Ul Adha. We will be off from 15 June 2024 to 21 June 2024. During this period, all operations and services will be
          temporarily halted. We will resume our regular business hours on
          22 June 2024. We appreciate your understanding and wish you a
          joyous and blessed Eid Ul Adha! Thank you for your cooperation.
        </p>
        <div>
          <p className="text-center"><strong>Best Regards,</strong></p>
          <p className="text-center font-roboto">{userData?.company_name}</p>
        </div>
      </div>
    </section>
  );
}

export default NoticeBoard;
