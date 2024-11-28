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
const app = express();
const PORT = process.env.PORT || 5000;
const CORSURL = process.env.LOCAL_URL;

app.use(
  cors({
    origin: `${CORSURL}`,
    credentials: true,
  })
);
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
});
