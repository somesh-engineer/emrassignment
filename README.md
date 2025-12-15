# EMR Appointment Management – SDE Intern Assignment

## Overview
This project implements a simplified **Electronic Medical Records (EMR) – Appointment Management View** as part of the SDE Intern hiring assignment.

The solution is divided into:
- **Task 1:** Backend Service Implementation (Python)
- **Task 2:** Frontend Integration and Functionality (React)

The goal is to simulate how a real Scheduling & Queue microservice would work in production while keeping the implementation lightweight and easy to evaluate.

---

## Project Structure

```
emr_assignment/
│
├── backend/
│   ├── appointment_service.py
│   └── requirements.txt
│
├── frontend/
│   ├── src/
│   │   ├── EMR_Frontend_Assignment.jsx
│   │   ├── App.js
│   │   └── index.css
│   ├── package.json
│   └── tailwind.config.js
│
└── README.md
```

---

## Task 1: Backend Service (Python)

### File
`backend/appointment_service.py`

### Features Implemented
- Hardcoded list of **15 mock appointments** (simulating an Aurora DB fetch)
- Each appointment includes:
  - Patient name
  - Date
  - Time
  - Duration
  - Doctor name
  - Status (Confirmed, Scheduled, Upcoming, Cancelled)
  - Mode (In-Person / Video Call)

### Functions
- `get_appointments(date=None, status=None)`
- `update_appointment_status(id, new_status)`

### Architecture Notes
In a production system:
- Status updates trigger an **Aurora transactional write**
- **AWS AppSync subscriptions** notify connected clients in real time

For this assignment, logic is simulated using in-memory data.

---

## Task 2: Frontend Integration (React)

### File
`frontend/src/EMR_Frontend_Assignment.jsx`

### Key Implementation Details
- Uses React hooks (`useState`, `useEffect`)
- Full interactive calendar UI
- Calendar-based filtering
- Tab-based filtering (All, Today, Upcoming, Past)
- Real-time UI updates on status change

### Important Design Note
Python code cannot be executed directly inside a React application due to browser runtime limitations.

Therefore:
- Python defines the **API contract**
- Frontend mirrors the logic in JavaScript to simulate direct invocation
- No HTTP or API calls are used

This approach aligns with system-design best practices.

---

## Running the Project

### Backend (Optional)
```bash
cd backend
pip install -r requirements.txt
python appointment_service.py
```

### Frontend
```bash
cd frontend
npm install
npm start
```

---

## Assignment Coverage Summary

| Requirement | Status |
|-----------|--------|
Mock backend service | ✅ |
Calendar filtering | ✅ |
Tab filtering | ✅ |
Status updates | ✅ |
UI consistency | ✅ |

---

## Author
Someshwar  
SDE Intern Candidate
