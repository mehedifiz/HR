import { Elements } from "@stripe/react-stripe-js";
import PaymentForm from "../../components/paymentForm/PaymentForm";
import SectionTitle from "../../components/sectionTitle/SectionTitle";
import PageTitle from "../../components/pageTitle/PageTitle";
import useUserData from "../../hooks/useUserData";
import { loadStripe } from "@stripe/stripe-js";
import { Spinner } from "@material-tailwind/react";
import Paymentscg from "../../svgs/Paymentscg";
function Payment() {
  const stripePromise = loadStripe(import.meta.env.VITE_Payment_Gateway_PK);
  const { userData, isLoading } = useUserData();

  console.log("Data in Payment page:", userData, "isLoading:", isLoading);

  
  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-100">
        <div className="text-center">
          <Spinner className="text-blue-500" size="xl" />
          <h2 className="mt-4 text-xl font-semibold text-gray-700">Loading...</h2>
        </div>
      </div>
    );
  }

  return (
    <section className="py-8 min-h-[70vh] bg-gray-50 flex flex-col items-center justify-center">
      <PageTitle title="Payment" />
      
      <div className="template-container max-w-4xl w-full mx-auto">
        <div className="text-center mb-6">
          <SectionTitle
            sectionTitle={
              userData?.packages === "basic"
                ? "You Are Using 5 Members For $5 Package!"
                : userData?.packages === "standard"
                ? "You Are Using 10 Members For $8 Package!"
                : userData?.packages === "premium"
                ? "You Are Using 20 Members For $15 Package!"
                : "Please select a package" // fallback message
            }
          />
        </div>

        {/* Adding the PaymentScg SVG component */}
        <div className="w-full md:w-2/3 xl:w-1/3 mx-auto mb-6">
          <Paymentscg className="w-full h-auto mx-auto" />
        </div>

        <div className="w-full md:w-2/3 xl:w-1/3 mx-auto shadow-lg rounded-lg p-6 bg-white">
          <Elements stripe={stripePromise}>
            <PaymentForm />
          </Elements>
        </div>
      </div>
    </section>
  );
}

export default Payment;
