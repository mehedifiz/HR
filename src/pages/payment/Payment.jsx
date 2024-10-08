// import { Elements } from "@stripe/react-stripe-js";
// import { loadStripe } from "@stripe/stripe-js";
// import CheckoutForm from "../../components/CheckoutForm";
// import { useLocation } from "react-router-dom";
// import { useState } from "react";
// import useCurrentUser from "../../hooks/useCurrentUser";

// const stripePromise = loadStripe(import.meta.env.VITE_Payment_Gateway_PK);

// const Payment = () => {
//   const [currentUser] = useCurrentUser();
//   // const location = useLocation();
//   // const {price} = location.state;
//   // const { price: initialPrice, cartIds } = location.state;
//   // const [price, setPrice] = useState(initialPrice);
//   // console.log("From payment component", price);
//   return (
//     <div className="min-h-screen">
//       <section className="container mx-auto ">
//         <div className="flex justify-center py-8 items-center ">
//           <h1 className="font-roboto lg:text-3xl md:text-2xl text-xl font-bold">Total Payment Price: ${currentUser.packagePrice}</h1>
//         </div>
//       </section>
//       <section className="container mx-auto">
//         <div className="lg:w-4/12 w-full mx-auto md:px-0 px-2 my-8">
//           <Elements stripe={stripePromise}>
//             {/* <CheckoutForm price={price}></CheckoutForm> */}
//             <CheckoutForm
//               // price={price}
//               // setPrice={setPrice}
//               // cartIds={cartIds}
//             ></CheckoutForm>
//           </Elements>
//         </div>
//       </section>
//     </div>
//   );
// };

// export default Payment;
