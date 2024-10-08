import { Elements } from "@stripe/react-stripe-js";
import SectionTitle from "../../components/sectionTitle/SectionTitle";
import PageTitle from "../../components/pageTitle/PageTitle";
import { loadStripe } from "@stripe/stripe-js";
import IncreaseForm from "../../components/paymentForm/IncreaseForm";

function IncreaseLimit() {
    // Stripe
    const stripePromise = loadStripe(import.meta.env.VITE_Payment_Gateway_PK);
  
    return (
      <section className="py-6">
        <PageTitle title={"Increase Limit"} />
        <div className="container mx-auto">
          <div className="text-center mb-6">
            <SectionTitle sectionTitle={"Increase Your Limit"} />
          </div>
          <div className="w-full lg:w-2/6 md:w-3/6 mx-auto md:px-0 px-2">
            <Elements stripe={stripePromise}>
              <IncreaseForm />
            </Elements>
          </div>
        </div>
      </section>
    );
  }
  
  export default IncreaseLimit;