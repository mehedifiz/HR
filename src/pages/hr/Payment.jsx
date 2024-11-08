import { Elements } from "@stripe/react-stripe-js";
import PaymentForm from "../../components/paymentForm/PaymentForm";
import SectionTitle from "../../components/sectionTitle/SectionTitle";
import PageTitle from "../../components/pageTitle/PageTitle";
import useUserData from "../../hooks/useUserData";
import { loadStripe } from "@stripe/stripe-js";
import { Spinner } from "@material-tailwind/react";

function Payment() {
  const stripePromise = loadStripe(import.meta.env.VITE_Payment_Gateway_PK);
  const { userData, isLoading } = useUserData();

  console.log("Data in Payment page:", userData, "isLoading:", isLoading);

  // If the data is still loading, show the spinner
  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <h2>loading .. </h2>
         
      </div>
    );
  }

  return (
    <section className="py-8 min-h-[70vh] flex items-center">
      <PageTitle title="Payment" />
      <div className="template-container">
        <div className="text-center">
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
        <div className="w-full md:w-2/3 xl:w-1/3 mx-auto">
          <Elements stripe={stripePromise}>
            <PaymentForm />
          </Elements>
        </div>
      </div>
    </section>
  );
}

export default Payment;
