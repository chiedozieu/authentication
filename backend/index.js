import express from "express";
import dotenv from "dotenv";
import connectDB from "./db/connectDB.js";
dotenv.config();
import authRoutes from "./routes/auth.routes.js";

import cookieParser from "cookie-parser";

const app = express();

const port = process.env.PORT || 5000;
app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", authRoutes);

app.listen(port, () => {
  console.log("Server is running on port " + port);
  connectDB();
});
