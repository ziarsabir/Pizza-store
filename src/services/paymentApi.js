import axios from "axios";

// Backend payment API URL.
// Falls back to my local Express server during development.
const PAYMENT_API_URL =
  process.env.REACT_APP_PAYMENT_API_URL ||
  "http://localhost:3001/api/payments";

/**
 * Sends the current cart to the Express backend.
 *
 * The backend then:
 * 1. validates the cart
 * 2. looks up the trusted prices
 * 3. creates a Stripe Checkout Session
 * 4. returns the Stripe Checkout URL
 */
export async function createCheckoutSession(cart) {
  const response = await axios.post(
    `${PAYMENT_API_URL}/create-checkout-session`,
    {
      cart,
    }
  );
  
    console.log("Stripe checkout response:", response.data);

  return response.data;
}