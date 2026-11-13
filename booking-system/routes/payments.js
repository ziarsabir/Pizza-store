const express = require("express");
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const menuCatalog = require("../config/menuCatalog");

const router = express.Router();

/**
 * POST /api/payments/create-checkout-session
 *
 * Receives the customer's cart from the React frontend,
 * validates each cart object, looks up the trusted price
 * on the backend, and creates a Stripe Checkout Session.
 */
router.post("/create-checkout-session", async (req, res, next) => {
  try {
    const { cart } = req.body;

    // The cart must be a non-empty array.
    if (!Array.isArray(cart) || cart.length === 0) {
      return res.status(400).json({
        message: "Cart must contain at least one item.",
      });
    }

    /**
     * Convert each cart object into the line-item shape
     * that Stripe expects.
     */
    const lineItems = cart.map((item) => {
      // Look up the trusted backend price using the item's name.
      const unitAmount = menuCatalog[item.name];

      // Reject products that do not exist in our backend menu.
      if (unitAmount === undefined) {
        const error = new Error(`Unknown menu item: ${item.name}`);
        error.statusCode = 400;
        throw error;
      }

      // Quantity must be a positive whole number.
      if (!Number.isInteger(item.quantity) || item.quantity < 1) {
        const error = new Error(
          `Invalid quantity for ${item.name}`
        );
        error.statusCode = 400;
        throw error;
      }

      return {
        price_data: {
          currency: "gbp",

          product_data: {
            name: item.name,
          },

          // Stripe expects GBP prices in pence.
          unit_amount: unitAmount,
        },

        quantity: item.quantity,
      };
    });

    /**
     * Create a Stripe-hosted Checkout Session.
     *
     * "payment" means this is a one-off purchase,
     * rather than a subscription.
     */
    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      line_items: lineItems,

      success_url:
        `${process.env.CLIENT_URL}/checkout-success`,

      cancel_url:
        `${process.env.CLIENT_URL}/cart`,
    });

    // Send the Stripe Checkout URL back to the React frontend.
    res.json({
      url: session.url,
    });
  } catch (error) {
    next(error);
  }
});

module.exports = router;