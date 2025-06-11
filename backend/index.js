import express from "express";
import dotenv from "dotenv";
import connectDB from "./db/connectDB.js";
dotenv.config();
import authRoutes from "./routes/auth.routes.js";

// import cookieParser from "cookie-parser";
// import cors from "cors";

const app = express();

const port = process.env.PORT
// app.use(express.json());
// app.use(cookieParser()); 
// app.use(cors(
//     {
//         credentials: true,
//         origin: "http://localhost:3000"
//     }
// ));
app.get("/", (req, res) => {
    res.send("Hello World!");
})
app.use("/api/auth", authRoutes);

app.listen(port, () => {
    console.log("Server is running on port " + port);
    connectDB();
}); 
