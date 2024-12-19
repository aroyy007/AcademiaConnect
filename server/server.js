import express from "express"
import dotenv from "dotenv"
import mongoose from "mongoose";
import authRoutes from "./routes/auth.js"
// import postsRoutes from "./routes/posts.js"
import { Server } from 'socket.io';
import { createServer } from 'http';
import cors from "cors"
dotenv.config();

const app = express();
const server = createServer(app);

// database connect
mongoose.connect(process.env.MONGODB_URI)
    .then(() => {
        console.log("successfully connected MongoDB DataBase")
    })
    .catch((err) => {
        console.log("Mongoose connection err : ", err);
    })

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors({
    origin: process.env.CLIENT_URL
}));

app.use("/api/auth", authRoutes);
// app.use('/api/posts', postsRoutes);

let PORT = process.env.PORT || 8000;

server.listen(PORT, () => {
    console.log("server is runnning on port ", PORT);
})