# PrimeTrade Dashboard

A modern, scalable web application for trading intelligence, featuring a secure dashboard and real-time task management. Built with Next.js, Node.js, and MongoDB.

## Features

- **Authentication**: Secure JWT-based registration and login system.
- **Dashboard**: Protected route displaying user-specific data.
- **Task Management**: Full CRUD operations for tasks (sample entity).
- **Responsive Design**: Beautiful UI built with Tailwind CSS and Framer Motion.
- **Backend**: Robust Node.js/Express API with MongoDB integration.

## Tech Stack

### Frontend
- **Framework**: Next.js 14+ (App Router)
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **State/Auth**: React Context API
- **Icons**: Lucide React
- **HTTP Client**: Axios

### Backend
- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB (Mongoose)
- **Auth**: JWT & Bcrypt based authentication
- **Tools**: Nodemon, Dotenv

## Getting Started

### Prerequisites
- Node.js (v18 or higher)
- MongoDB (Local or Atlas URI)

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd PrimeTrade_DashBoard
   ```

2. **Backend Setup**
   ```bash
   cd backend
   npm install
   # Create a .env file based on the example
   npm run dev
   ```
   *The backend will run on `http://localhost:5000`*

3. **Frontend Setup**
   ```bash
   cd frontend
   npm install
   npm run dev
   ```
   *The frontend will run on `http://localhost:3000` (or 3001 if 3000 is busy)*

## API Documentation

See [API_DOCUMENTATION.md](./API_DOCUMENTATION.md) for detailed API endpoints.

## Project Structure

```
PrimeTrade_DashBoard/
├── backend/                 # Express backend
│   ├── src/
│   │   ├── config/         # DB config
│   │   ├── controllers/    # Route controllers
│   │   ├── middleware/     # Auth middleware
│   │   ├── models/         # Mongoose models
│   │   └── routes/         # API routes
│   └── server.js           # Entry point
│
└── frontend/               # Next.js frontend
    ├── src/
    │   ├── app/            # App router pages
    │   ├── components/     # Reusable components
    │   ├── context/        # Auth context
    │   └── utils/          # API utilities
    └── public/             # Static assets
```
