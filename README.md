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