import express from "express"
import db from './config/db.js'
import studentRouter from "./routes/students.route.js";
import bodyParser from "body-parser";
import cors from 'cors'
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
dotenv.config()
const app=express()
const port=3000||process.env.port;

app.use(bodyParser.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(express.json())
app.use(cors({
  origin: 'http://localhost:5173',   // must match your frontend origin exactly
  credentials: true                  // allow cookies/auth headers
}))

app.use('/api/student',studentRouter)

app.get('/',(req,res)=>{
    res.send("helo bh")
})

app.listen(port,()=>{
    console.log("App listning of ", port)
})

