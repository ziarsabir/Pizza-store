# Pizza Store 2 🍕

A full-stack pizza restaurant website built with React (frontend) and Node.js + Express (backend).  
Includes a complete table booking system with validation, conflict detection, and status management.

---

## Features

- React frontend with reusable components
- Express REST API for bookings
- Full CRUD booking functionality
- Time-slot conflict detection
- Booking status management
- Axios-based frontend → backend communication
- Clean, centralised documentation (single README)

---

## Project Structure

pizza-store-2/
│
├── src/ # React frontend
│ ├── components/
│ │ ├── BookingForm.jsx
│ │ ├── HeroSection.jsx
│ │ └── ...
│ │
│ ├── services/
│ │ └── bookingApi.js # Axios API helpers (frontend → backend)
│ │
│ ├── App.js
│ └── index.js
│
├── booking-system/ # Express backend API
│ ├── routes/
│ │ └── bookings.js
│ ├── utils/
│ │ ├── validation.js
│ │ └── database.js
│ ├── server.js
│ └── package.json
│
└── README.md


---

## Running the App (Two Terminals)

### 1. Frontend (React)

From the project root:

```bash
npm install
npm start
Runs at:
http://localhost:3000

2️⃣ Backend (Express API)
Open a second terminal, from the project root:

bash
Copy code
cd booking-system
npm install
npm run dev
Runs at:
http://localhost:3001

API available at:
http://localhost:3001/api/bookings

🔗 Frontend → Backend Connection
The frontend communicates with the backend using Axios, defined in:


src/services/bookingApi.js


const API_BASE_URL =
  process.env.REACT_APP_API_URL ||
  'http://localhost:3001/api/bookings';

 Booking API Functions (Frontend)

The frontend uses the following API helpers:

getBookings()

getBooking(id)

createBooking(bookingData)

updateBooking(id, updates)

updateBookingStatus(id, status)

deleteBooking(id)

These functions are imported and used inside React components such as:


src/components/BookingForm.jsx

 Booking Logic Overview: 

Bookings are validated on the backend

Past dates are rejected

Restaurant hours enforced (11:00 – 22:00)

Closed day: Monday

Time-slot conflicts are detected before saving

Booking duration is automatically calculated (2 hours)

🧪 Example API Endpoint: 

POST /api/bookings
Request body:

json

{
  "customerName": "John Doe",
  "email": "john@example.com",
  "phone": "123456789",
  "date": "2024-01-15",
  "time": "19:00",
  "numberOfGuests": 4,
  "specialRequests": "Window seat"
}

Notes

Frontend and backend are clearly separated but fully connected.

The project is structured for clarity, scalability, and portfolio presentation.

