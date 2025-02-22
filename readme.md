# Railway Management System

## 🚆 Project Overview

This project is a **Railway Management System** that allows users to:

- Search for trains based on **source and destination**.
- View multiple train options with different timings.
- Select a train based on schedule suitability.
- Book tickets for multiple passengers.
- **Admin Panel:** Manage trains, stations, schedules, and users.

## 📌 Features

### **User Side:**

- 🔍 **Train Search:** Users can search for trains by providing a source and destination.
- 🚉 **Train Selection:** Users get multiple train options and can choose the best one.
- 🎟 **Ticket Booking:** Users can book tickets for multiple passengers under a single user ID.
- 📋 **View Bookings:** Users can see all their past and upcoming bookings.

### **Admin Side:**

- 🚆 **Train Management:** Admin can add, edit, and delete trains with details like `TrainNo`, `ArrivalTime`, `DepartureTime`, `Destination`, `Source`, and `Date`.
- 🚉 **Station Management:** Admin can add, edit, and delete stations associated with trains.
  ```sql
  INSERT INTO Station (Name, TrainNo) VALUES (?, ?);
  ```
- 📅 **Schedule Management:** Admin can add schedules where a train stops at multiple stations, each with different arrival and departure times.
  ```sql
  INSERT INTO Schedule (ScheduleId, TrainNo, StationNo, ArrivalTime, DepartureTime) VALUES (?, ?, ?, ?, ?);
  ```
- 👥 **User Management:** Admin can see all users registered in the app.

### **Future Scope:**

- **Concurrent Ticket Booking Handling:** Implementation of **row locking, Redis for seat reservations, and RabbitMQ for queue processing**.
- **Real-time Train Tracking:** GPS and IoT devices for live train status updates.

## 🏠 Home Page Flow

1. **Landing Page:** Users see the option to **search for trains** by entering **source and destination**.
2. **Login Page:**
   - Users can log in to access their bookings and book tickets.
   - Admins can log in to manage trains, schedules, stations, and users.
3. **Navigation:**
   - Users: Train search → Select train → Book ticket → View bookings.
   - Admins: Train management → Schedule management → Station management → User management.

## 🛠 Tech Stack

### **Frontend:**

- React Native (for mobile app UI)
- Axios (for API calls)
- WebSockets (for future real-time updates)

### **Backend:**

- Node.js (Express for API development)
- MySQL (for train and booking data)
- Redis (planned for temporary seat reservations)
- RabbitMQ (planned for processing bookings)
- WebSockets (planned for real-time updates)

## 🚀 Installation & Setup

### **Backend Setup**

1. Clone the repository:
   ```sh
   git clone https://github.com/Saurabh2512-Bansode/RailwayManagementSystem.git
   cd railway-management-backend
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Configure `.env` file:
   ```sh
   DB_HOST=localhost
   DB_USER=root
   DB_PASSWORD=manager
   DB_NAME=trainreservationsystem
   ```
4. Start the backend server:
   ```sh
   npm start
   ```

### **Frontend Setup**

1. Navigate to the frontend folder:
   ```sh
   cd railway-management-frontend
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Start the React Native app:
   ```sh
   npx react-native run-android   # For Android
   npx react-native run-ios       # For iOS
   ```

## 📡 API Endpoints

### **Train Search API**

- **Endpoint:** `GET /trains?source=<source>&destination=<destination>`
- **Response:**
  ```json
  [
    {
      "train_id": 1,
      "name": "Express Train",
      "departure_time": "10:30 AM",
      "arrival_time": "5:00 PM"
    }
  ]
  ```

### **Book Ticket API**

- **Endpoint:** `POST /ticket`
- **Request Body:**
  ```json
  {
    "UserId": 123,
    "TrainNo": 101,
    "TicketId": "TCKT12345",
    "NoOfPassengers": 2,
    "TotalFare": 500,
    "BookingDate": "2025-02-22"
  }
  ```
- **Response:**
  ```json
  {
    "message": "Ticket booked successfully",
    "BookingId": 1
  }
  ```

### **Add Train API (Admin)**

- **Endpoint:** `POST /train`
- **Request Body:**
  ```json
  {
    "TrainNo": 101,
    "ArrivalTime": "10:30 AM",
    "DepartureTime": "5:00 PM",
    "Destination": "City B",
    "Source": "City A",
    "Date": "2025-02-22"
  }
  ```

### **Manage Stations API (Admin)**

- **Add Station:**
  ```json
  {
    "Name": "Central Station",
    "TrainNo": 101
  }
  ```
- **Edit/Delete:** Supports modifying or deleting stations.

### **Manage Schedule API (Admin)**

- **Add Train Schedule:**
  ```json
  {
    "ScheduleId": 1,
    "TrainNo": 101,
    "StationNo": 5,
    "ArrivalTime": "12:00 PM",
    "DepartureTime": "12:15 PM"
  }
  ```

### **User Management API (Admin)**

- **View Users:** Admin can fetch all users registered in the system.

## 👥 Contributors

- **Saurabh Bansode** - [GitHub Profile](https://github.com/Saurabh2512-Bansode/RailwayManagementSystem.git)

## 📜 License

This project is licensed under the **MIT License**.

