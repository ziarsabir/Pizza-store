PIZZA STORE PROJECT 🍕

A full-stack pizza restaurant website built with React (frontend) and Node.js + Express (backend).

Includes a complete table booking system with validation, time-slot conflict detection, and booking status management.

FEATURES

React frontend with reusable components

Express REST API for bookings

Full CRUD booking functionality

Time-slot conflict detection

Booking status management

Axios-based frontend → backend communication

Clean, centralised documentation (single README)


PROJECT STRUCTURE 

pizza-store-2/
├─ src/ # React frontend
│ ├─ components/
│ │ ├─ BookingForm.jsx
│ │ └─ ...
│ ├─ services/
│ │ └─ bookingApi.js # Axios API helpers (frontend → backend)
│ └─ ...
├─ booking-system/ # Express backend API
│ ├─ routes/
│ │ └─ bookings.js
│ ├─ utils/
│ │ ├─ validation.js
│ │ └─ database.js
│ ├─ data/
│ │ └─ bookings.json
│ ├─ server.js
│ └─ package.json
└─ README.md

Running the App (Two Terminals)
1. Frontend (React)

From the project root:

npm install
npm start

Runs at:
http://localhost:3000

2. Backend (Express API)

Open a second terminal, from the project root:

cd booking-system
npm install
npm run dev

Runs at:
http://localhost:3001

API available at:
http://localhost:3001/api/bookings

Frontend → Backend Connection

The frontend communicates with the backend using Axios, defined in:

src/services/bookingApi.js

const API_BASE_URL =
process.env.REACT_APP_API_URL ||
'http://localhost:3001/api/bookings
';

Booking API Functions (Frontend)

getBookings()

getBooking(id)

createBooking(bookingData)

updateBooking(id, updates)

updateBookingStatus(id, status)

deleteBooking(id)

Used inside components such as:

src/components/BookingForm.jsx


BOOKING LOGIC OVERVIEW:

Bookings are validated on the backend

Past dates are rejected

Restaurant hours enforced (11:00 – 22:00)

Closed day: Monday

Time-slot conflicts detected before saving

Booking duration automatically calculated (2 hours)

EXAMPLE API ENDPOINT: 

POST /api/bookings

Request body:

{
"customerName": "John Doe",
"email": "john@example.com
",
"phone": "123456789",
"date": "2024-01-15",
"time": "19:00",
"numberOfGuests": 4,
"specialRequests": "Window seat"
}

NOTES

Frontend and backend are clearly separated but fully connected

The project is structured for clarity, scalability, and portfolio presentation

## Stripe checkout

From the cart, **Proceed to Checkout** sends the cart to `POST /api/payments/create-checkout-session`. The Express backend checks that the cart contains recognised menu items and positive whole-number quantities. It looks up each item by name in the [backend menu catalogue](booking-system/config/menuCatalog.js), which stores GBP prices in pence. For example, Pepperoni Pizza is charged at `1200` pence per item. Prices sent by the browser are ignored.

The backend creates a one-off Stripe Checkout Session and returns its hosted URL as `{ "url": "…" }`. The browser opens that URL to collect payment. Stripe returns the customer to `/checkout-success` after checkout or `/cart` on cancellation. Opening the success page clears the saved cart. Cancelling keeps the cart contents.

### Stripe configuration for local development

| Variable | What it does and why it is needed | How to configure it |
| --- | --- | --- |
| `STRIPE_SECRET_KEY` | Lets the Express backend authenticate with Stripe and create Checkout Sessions. The payment router loads when Express starts, so the SDK needs a value at startup. | Add your Stripe sandbox secret key (`sk_test_…`) to `booking-system/.env`. Get it from the Stripe Dashboard and keep it server-side and out of Git. |
| `CLIENT_URL` | Tells Stripe which frontend to return the customer to after checkout or cancellation. | Set `CLIENT_URL=http://localhost:3000` in `booking-system/.env`, without a trailing slash. |
| `REACT_APP_PAYMENT_API_URL` | Tells the frontend where to request a Checkout Session. | Optional in the root `.env.local`. It defaults to `http://localhost:3001/api/payments`. Include `/api/payments` if you override it. |

After setting the backend variables, follow the existing two-terminal setup above. Use a [Stripe test card](https://docs.stripe.com/testing#cards) to try the hosted checkout in your sandbox.

### Automated backend tests

From `booking-system/`, run the Jest and Supertest suite. A placeholder key lets the booking tests load the Express app without Stripe credentials:

```bash
STRIPE_SECRET_KEY=sk_test_placeholder npm test
```

To run only the [Stripe route tests](booking-system/__tests__/payments.post.test.js), use `npm test -- __tests__/payments.post.test.js`. They provide a dummy key and mock the Stripe SDK to check session creation, backend pricing, redirect URLs and invalid carts.

### Proposed payment improvements

Add server-side payment verification through signed Stripe webhooks and persist orders before fulfilment. The current success page clears the cart when it loads.
