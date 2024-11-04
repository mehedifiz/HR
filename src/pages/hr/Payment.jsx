import { Elements } from "@stripe/react-stripe-js";
import PaymentForm from "../../components/paymentForm/PaymentForm";
import SectionTitle from "../../components/sectionTitle/SectionTitle";
import PageTitle from "../../components/pageTitle/PageTitle";
import useUserData from "../../hooks/useUserData";
import { loadStripe } from "@stripe/stripe-js";

function Payment() {
    // Stripe
    const stripePromise = loadStripe(import.meta.env.VITE_Payment_Gateway_PK);
    const { userData } = useUserData();
  
    return (
      <section className="py-8 min-h-[70vh] flex items-center">
        <PageTitle title={"Payment"} />
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
                  : ""
              }
            />
          </div>
          <div className="w-full md:w-2/3 xl:w-1/3 mx-auto">
            <div>
              <div>
                <Elements stripe={stripePromise}>
                  
                </Elements>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }
  
  export default Payment;