// server.js
import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";
import internshipRoutes from "./routes/internshipRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import path from "path";

dotenv.config();
connectDB();

const app = express();

// -------------------- Middleware --------------------
// CORS middleware
app.use(cors({
  origin: "*", // allow all origins
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization", "X-Requested-With"]
}));

// Body parsing middleware
app.use(express.json()); // parse JSON body
app.use(express.urlencoded({ extended: true })); // parse URL-encoded bodies

// -------------------- Static files --------------------
app.use(express.static(path.join(process.cwd(), "public")));

// Debug middleware to log all requests
app.use((req, res, next) => {
  console.log(`Request received: ${req.method} ${req.url}`);
  console.log('Headers:', req.headers);
  next();
});

// -------------------- Routes --------------------
app.use("/api/auth", authRoutes); // register/login routes
app.use("/api/internships", internshipRoutes); // internships routes

// -------------------- Health check --------------------
app.get("/api/health", (req, res) => {
  res.status(200).json({ message: "Server is running!" });
});

// Test endpoint for debugging
app.post("/api/test", (req, res) => {
  console.log('Test endpoint hit');
  console.log('Request body:', req.body);
  res.status(200).json({ message: "Test endpoint working!", body: req.body });
});

// -------------------- Start server --------------------
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
