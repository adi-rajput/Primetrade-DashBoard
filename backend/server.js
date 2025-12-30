const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./src/config/db');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({
  origin: [
    'http://localhost:3000',
    'http://localhost:3001',
    'http://localhost:3002',
    'https://primetrade-dashboard-xxxxx.vercel.app', // Replace with YOUR Vercel URL
  ],
  credentials: true
}));
app.use(express.json());

// Database Connection
connectDB();

// Routes
app.use('/api/auth', require('./src/routes/authRoutes'));
app.use('/api/tasks', require('./src/routes/taskRoutes'));

app.get('/', (req, res) => {
  res.send('API is running...');
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
