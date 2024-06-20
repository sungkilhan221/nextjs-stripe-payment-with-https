"use client";

import CheckoutPage from "@/components/CheckoutPage";
import convertToSubcurrency from "@/lib/convertToSubcurrency";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { useState } from "react";

if (process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY === undefined) {
  throw new Error("NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY is not defined");
}

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
);

export default function Home() {
  const [priceAmount, setPriceAmount] = useState(1);
  const amount = priceAmount === 0 || !priceAmount ? 1 : priceAmount;

  return (
    <main className="text-white text-center bg-gradient-to-tr from-blue-500 to-purple-500 min-h-screen px-5">
      <div className="pt-20 pb-10">
        <h1 className="text-4xl font-extrabold">Andrew</h1>
        <div className="flex items-center justify-center">
          <div className="relative text-gray-600 focus-within:text-gray-400">
            <p className="absolute top-[27px] left-[20px] text-black font-bold text-2xl ">
              $
            </p>
            <input
              placeholder=""
              type="text"
              maxLength={5}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                const filterPrice = Number(e.target.value);
                setPriceAmount(filterPrice);
              }}
              className="text-black p-2 rounded-md mt-5 text-2xl font-bold text-center"
            />
          </div>
        </div>
        <div>
          <h2 className="text-2xl mt-2"></h2>
          has requested
          <span className="font-bold"> ${amount}</span>
        </div>
      </div>

      <Elements
        stripe={stripePromise}
        options={{
          mode: "payment",
          amount: convertToSubcurrency(amount), // cents
          currency: "usd",
        }}
      >
        <CheckoutPage amount={amount} />
      </Elements>
    </main>
  );
}
