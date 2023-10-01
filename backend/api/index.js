import dotenv from "dotenv";
import express from "express";
import mongoose from "mongoose";
import authRouter from "./routes/auth.js";
import usersRouter from "./routes/users.js";
import hotelsRouter from "./routes/hotels.js";
import roomsRouter from "./routes/rooms.js";
import cookieParser from "cookie-parser";
import cors from "cors"
import comments from "./models/comments.js";
import commentsRouter from "./routes/comments.js";

dotenv.config()

const connect = async() =>{
    try {
        await mongoose.connect(process.env.MONGO);
        console.log("Connected to MongoDB")
    } 
    catch (error) {
        throw(error)
    }
}

mongoose.connection.on("disconnected", () =>{
    console.log("Mongo Disconnected")
})

mongoose.connection.on("connected", () =>{
    console.log("Mongo connected")
})

const app = express()

// app.get('/', (req, res) =>{
//     res.send("Hello this side")
// })
app.use(cors())
app.use(cookieParser())
app.use(express.json())


app.use('/api/users', usersRouter);
app.use('/api/hotels', hotelsRouter);
app.use('/api/auth', authRouter);
app.use('/api/rooms', roomsRouter);
app.use('/api/comments', commentsRouter);

app.use((err, req, res, next) =>{
    const status = err.status || 500;
    const mes = err.message || "Error !!"
    return res.status(status).json({
        success: false,
        status: status,
        Message: mes,
        Stack: err.stack
    })
})

app.listen(8800, () =>{
    connect()
    console.log("Connected to backend!")
})