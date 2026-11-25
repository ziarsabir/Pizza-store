# Papa Z’s Pizza

Papa Z’s Pizza is a full-stack restaurant website where customers can browse the menu, order food through Stripe Checkout, and reserve a table. The frontend uses React, React Router, Tailwind CSS and Axios. The backend uses Node.js and Express, stores bookings in a local JSON file, and uses the Stripe Node SDK to create Checkout Sessions.

## Table bookings

Customers submit reservations through the booking form. The Express API supports creating, listing, retrieving, updating and deleting bookings, plus changing their status.

- The API validates contact details, the requested date and time, and a party size of 1–20. It rejects past dates and Monday reservations.
- The restaurant opens from 11:00 to 22:00 on booking days. Each reservation lasts two hours. The booking form offers 20:00 as its last start time, and the API currently checks the start hour.
- New bookings are automatically confirmed when a slot is available. The create route allows up to five overlapping non-cancelled bookings. The update route applies a separate rule and rejects a date or time change that overlaps another non-cancelled booking.
- Bookings are stored by date in `booking-system/data/bookings.json`. The backend creates the file on startup if needed.

## Stripe Checkout

1. A customer adds menu items to the cart, adjusts quantities and selects **Proceed to Checkout**. React persists the cart in browser `localStorage`.
2. The frontend sends the cart in a JSON object to `POST /api/payments/create-checkout-session`. The backend checks that the cart is a non-empty array, looks up each item by its exact name, and requires a positive whole-number quantity.
3. The backend uses the unit price from [its menu catalogue](booking-system/config/menuCatalog.js) to build Stripe line items in GBP. Catalogue prices are stored in pence, so a £12.00 Pepperoni Pizza is sent to Stripe as `1200`. The cart displays a total using frontend prices. Any price supplied by the browser is ignored when calculating the charge.
4. Express creates a one-off Stripe Checkout Session and returns its hosted URL as `{ "url": "…" }`. The browser redirects to Stripe, where the customer enters their payment details.
5. Stripe is configured to return the browser to `/checkout-success` after a successful checkout or to `/cart` if the customer cancels. Opening the success page clears the React cart and saves the empty cart to `localStorage`. Returning to the cart after cancellation preserves its contents.

The success page is currently driven by the browser redirect. Opening it directly also clears the cart. Server-side payment verification and order fulfilment are proposed improvements.

## API routes

The Express API runs at `http://localhost:3001` by default.

| Method | Path | Behaviour |
| --- | --- | --- |
| `GET` | `/` | Returns API information. |
| `GET` | `/api/bookings` | Lists bookings, most recent first. Accepts a `date` or `status` query parameter. If both are provided, `date` takes precedence. |
| `GET` | `/api/bookings/:id` | Returns a booking by ID. |
| `POST` | `/api/bookings` | Creates a confirmed booking. Returns `201` on success, `400` for validation errors, or `409` if the slot is unavailable. |
| `PUT` | `/api/bookings/:id` | Updates a booking's details. |
| `PATCH` | `/api/bookings/:id/status` | Takes a `status` of `pending`, `confirmed`, `cancelled` or `completed`. |
| `DELETE` | `/api/bookings/:id` | Deletes a booking by ID. |
| `POST` | `/api/payments/create-checkout-session` | Returns the hosted Checkout URL. Returns `400` for an empty cart, an unknown menu item or an invalid quantity. |

### Example booking request

Send this JSON object to `POST /api/bookings`. Choose a future date that falls between Tuesday and Sunday.

```json
{
  "customerName": "Sam Taylor",
  "email": "sam@example.com",
  "phone": "07700900123",
  "date": "2027-06-12",
  "time": "19:00",
  "numberOfGuests": 4,
  "specialRequests": "Window seat if available"
}
```

### Example checkout request

Send this JSON object to `POST /api/payments/create-checkout-session`. Each cart item needs a menu name and a quantity.

```json
{
  "cart": [
    {
      "name": "Pepperoni Pizza",
      "quantity": 2
    }
  ]
}
```

## Local setup

Use Node.js 22 and npm. To try checkout, you also need a Stripe sandbox account and its secret API key.

### 1. Install dependencies

```bash
git clone https://github.com/ziarsabir/Pizza-store.git
cd Pizza-store
npm ci
npm --prefix booking-system ci
```

### 2. Configure environment variables

Create `booking-system/.env`. In the Stripe Dashboard, select your sandbox and copy its secret key from the API keys page. Replace the placeholder below with that key. Keep the key in the backend environment and out of your commits. [Stripe API keys](https://docs.stripe.com/keys)

```dotenv
STRIPE_SECRET_KEY=sk_test_replace_with_your_key
CLIENT_URL=http://localhost:3000
PORT=3001
```

| Variable | What it does and why it is needed | How to configure it |
| --- | --- | --- |
| `STRIPE_SECRET_KEY` | Authenticates the backend with Stripe so it can create Checkout Sessions. Express loads the payment router at startup, so the SDK needs a value even when you only use bookings. | Set it in `booking-system/.env` to your Stripe sandbox secret key, starting with `sk_test_`. The booking tests can use the placeholder shown below. |
| `CLIENT_URL` | Gives Stripe the frontend origin for the success and cancellation redirects. | Set it in `booking-system/.env` to `http://localhost:3000` locally, without a trailing slash. Use the actual frontend origin if it runs elsewhere. |
| `PORT` | Sets the port on which Express accepts API requests. | Optional in `booking-system/.env`. Defaults to `3001`. Update both frontend API URLs if you change it. |
| `REACT_APP_API_URL` | Tells the React booking client where to send reservation requests. | Optional in root `.env.local`. Defaults to `http://localhost:3001/api/bookings`. Include the `/api/bookings` path. |
| `REACT_APP_PAYMENT_API_URL` | Tells the React payment client where to request Checkout Sessions. | Optional in root `.env.local`. Defaults to `http://localhost:3001/api/payments`. Include `/api/payments` and omit `/create-checkout-session`, which the client appends. |

The frontend API URL variables are public build settings. Restart the React dev server after changing them, or rebuild the frontend for deployment. Stripe hosts the payment page, so this integration requires no frontend Stripe key.

### 3. Start both servers

In the first terminal, run the backend from the project root.

```bash
cd booking-system
npm run dev
```

In a second terminal, run the frontend from the project root.

```bash
npm start
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Testing

### Automated backend tests

Run the backend suite from `booking-system/`. If you already have a backend `.env` with a Stripe key, `npm test` is enough. Otherwise, use this command in a POSIX-compatible shell.

```bash
STRIPE_SECRET_KEY=sk_test_placeholder npm test
```

The booking tests import the Express app, which loads the Stripe SDK. The placeholder lets the SDK initialise for those tests. The automated suites need no Stripe account or real credentials.

The backend test script runs Jest serially with `NODE_ENV=test`. Supertest sends HTTP requests to the exported Express app without requiring a separate server process. The tests mock JSON storage, and the POST tests also mock validation. The suite covers listing, sorting and filtering bookings, creating bookings and handling validation errors and slot conflicts, and deleting bookings or returning `404` for missing IDs.

The [payment route tests](booking-system/__tests__/payments.post.test.js) mock the Stripe SDK. They check that the backend passes the configured key to the SDK, uses catalogue prices and the expected redirect URLs, returns the Checkout URL, and rejects invalid carts before requesting a session. To run just this file from `booking-system/`, use:

```bash
npm test -- __tests__/payments.post.test.js
```

### Manual checkout testing

With both servers running and a sandbox key configured, add an item to the cart and proceed to Stripe Checkout. Complete a test payment with a [Stripe test card](https://docs.stripe.com/testing#cards), then check that the browser lands on `/checkout-success` and that the cart remains empty after a refresh. Try a second checkout and cancel it to confirm that `/cart` retains its items. The automated suite uses a mock for session creation. The manual check exercises the hosted Stripe page.

## Project structure

| Path | Responsibility |
| --- | --- |
| [`src/`](src/) | React pages and components, including the menu, cart, checkout success page and booking form. |
| [`src/services/`](src/services/) | Axios clients for the booking and payment APIs. |
| [`booking-system/app.js`](booking-system/app.js) | Configures and exports the Express app, including both routers. |
| [`booking-system/server.js`](booking-system/server.js) | Starts the HTTP listener. |
| [`booking-system/routes/`](booking-system/routes/) | Booking endpoints and Stripe Checkout Session creation. |
| [`booking-system/config/menuCatalog.js`](booking-system/config/menuCatalog.js) | Backend unit prices in pence. |
| [`booking-system/utils/`](booking-system/utils/) | Booking validation, availability checks and JSON persistence. |

## Proposed payment improvements

- Verify signed Stripe webhook events and confirm payment status on the server before fulfilling an order. [Stripe Checkout fulfilment](https://docs.stripe.com/checkout/fulfillment)
- Persist orders and their payment status, and handle repeated events without fulfilling an order twice.
