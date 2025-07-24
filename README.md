# 🕒 Resource Booking System

A full-stack web application that allows users to book shared resources (like rooms or devices) while preventing booking conflicts with built-in buffer time logic.

## 🔗 Live Demo

🌐 [Live Site](#) *(https://booking-system-tau-umber.vercel.app/)*

---

## 📌 Project Features

### 📅 Booking Form (`/`)
- Select a resource from dropdown (3–5 sample values)
- Choose Start Time and End Time (datetime-local)
- Input requester name
- Validates:
  - End Time > Start Time
  - Minimum booking duration of 15 minutes
- Submits data to backend API

### 🚫 Conflict Detection with Buffer Logic
- Prevents overlapping bookings on the same resource
- Adds a 10-minute buffer **before and after** existing bookings
- Rejects any booking request that overlaps with the buffered time range

### 📊 Booking Dashboard (`/bookings`)
- View all bookings grouped by resource
- Filter by resource and date
- Sort by upcoming time
- Show status tags:
  - 🟢 Upcoming
  - 🔵 Ongoing
  - ⚪ Past

---

## ⚙️ Tech Stack

| Technology         | Purpose                         |
|--------------------|----------------------------------|
| Next.js (App Router) | Full-stack framework (frontend & API) |
| React.js           | UI components                    |
| Tailwind CSS       | Styling                          |
| TypeScript         | Type safety                      |
| Prisma ORM         | Database access                  |
| PostgreSQL (Neon)  | Relational database              |


## 📝 Note
The original task recommended using **SQLite** for simplicity, but I have used **PostgreSQL** (hosted on **Neon**) instead. This was necessary because the project is deployed on **Vercel**, which does not support file-based databases like SQLite in serverless environments. PostgreSQL ensures reliable, scalable, and deployment-friendly data handling while still fulfilling all project requirements.
