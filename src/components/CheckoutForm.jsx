
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useContext, useEffect, useState } from "react";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../providers/AuthProvider";
import axios from "axios";
import useAxiosPublic from "../hooks/useAxiosPublic";
import useCurrentUser from "../hooks/useCurrentUser";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";

const CheckoutForm = () => {
  const [currentUser] = useCurrentUser();
  console.log(currentUser, currentUser.packagePrice);
  const [error, setError] = useState("");
  const [clientSecret, setClientSecret] = useState("");
  const [trxId, setTrxId] = useState("");
  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const axiosPublic = useAxiosPublic();

  useEffect(() => {
    if (currentUser.packagePrice > 0) {
      axiosPublic.post("/create-payment-intent", { price: currentUser.packagePrice }).then((res) => {
        setClientSecret(res.data.clientSecret);
      });
    }
  }, [axiosPublic, currentUser.packagePrice]);


  const { mutateAsync } = useMutation({
    mutationFn: async role => {
      const { data } = await axiosPublic.patch(
        `/users/update/${user?.email}`,
        role
      )
      return data
    },
    onSuccess: data => {
      // refetch()
      console.log(data)
      toast.success('User role updated successfully!')
    },
  })

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    const card = elements.getElement(CardElement);
    if (card == null) {
      return;
    }

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card,
    });

    if (error) {
      console.log("Payment Error", error);
      setError(error.message);
    } else {
      console.log("Payment Method", paymentMethod);
      setError("");
    }

    const { paymentIntent, error: confirmError } =
      await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: card,
          billing_details: {
            name: user?.displayName || "Anonymous",
            email: user?.email || "Anonymous",
          },
        },
      });

    if (confirmError) {
      setError(confirmError.message);
    } else {
      console.log(paymentIntent);
      if (paymentIntent.status === "succeeded") {
        const updatedUser = {
          packagePrice: 0
        }
        try {
          await mutateAsync(updatedUser)
        } catch (err) {
          console.log(err)
          toast.error(err.message)
        }
        setTrxId(paymentIntent.id);
        const payment = {
          email: user.email,
          price: currentUser.packagePrice,
          trxId: paymentIntent.id,
          date: new Date(),
          status: "pending",
           // add the necessary cart IDs here
        };

        const res = await axiosPublic.post("/payments", payment);
        if (res.data.paymentResult.insertedId) {
          
          Swal.fire({
            position: "center",
            icon: "success",
            title: "Your payment has been successful.",
            timer: 1000,
          });
          navigate("/");
        }
      }
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <CardElement
        options={{
          style: {
            base: {
              fontSize: "16px",
              color: "#424770",
              "::placeholder": {
                color: "#aab7c4",
              },
            },
            invalid: {
              color: "#9e2146",
            },
          },
        }}
      />
      <button
        className={`py-2 my-5 lg:text-lg text-xs font-inter font-bold px-5 ${
          !stripe || !clientSecret || currentUser.packagePrice <= 0
            ? "bg-gray-400 text-gray-700"
            : "bg-sky-500 text-white"
        }`}
        type="submit"
        disabled={!stripe || !clientSecret || currentUser.packagePrice <= 0}
      >
        Pay
      </button>
      <p className="font-inter text-red-500">{error}</p>
      {trxId && (
        <p className="font-inter font-bold text-green-500">
          Your Trx id:{" "}
          <span className="font-cinzel text-yellow-600">{trxId}</span>
        </p>
      )}
    </form>
  );
};

export default CheckoutForm;
