import express from "express"
import dotenv from "dotenv"
import mongoose from "mongoose";
// import authRoutes from "./routes/auth.js"

dotenv.config();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// app.use("/api/auth", authRoutes);
app.get("/", async (req, res) => {
    return res.json({
        success: false,
        message: "Working"
    })
})

const port = process.env.PORT || 9000

app.listen(port, () => {
    console.log("server is runnning on port ", port);
})