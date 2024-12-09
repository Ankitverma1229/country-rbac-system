import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import { connectDb } from "./config/connectDB.js";
import authRoutes from "./routes/authRoutes.js";
import dataRoutes from "./routes/dataRoutes.js";
import userRoutes from "./routes/userRoutes.js";

dotenv.config();
connectDb();
const PORT = process.env.PORT || 5000;
const clientUrl = process.env.CLIENT_URL;

const app = express();

app.use(
  cors({
    origin: clientUrl?.endsWith("/") ? clientUrl.slice(0, -1) : clientUrl,
    credentials: true,
  })
);

const isProduction = process.env.NODE_ENV === "production";
const baseURL = isProduction
  ? "https://country-rbac-system.onrender.com"
  : `http://localhost:${PORT}`;

app.use(express.json());
app.use(cookieParser());

app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Server running successfully!",
  });
});

app.use("/api/auth", authRoutes);
app.use("/api", dataRoutes);
app.use("/api/user", userRoutes);

app.listen(PORT, () => {
  console.log(`Server started at ${PORT}`);
  setInterval(async () => {
    try {
      const response = await axios.get(`${baseURL}`);
      console.log("Self-ping successful:", response.data);
    } catch (error) {
      console.error("Error during self-ping:", error.message);
    }
  }, 600000); // 10 minutes in milliseconds
});
