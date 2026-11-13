import React from "react";

export default function CheckoutSuccess() {
  return (
    <main className="min-h-screen bg-gray-900 px-4 pt-24 text-center font-italian text-white">
      <h1 className="text-4xl font-bold text-green-400">
        Payment successful!
      </h1>

      <p className="mt-4 text-xl">
        Thanks for your order.
      </p>
    </main>
  );
}