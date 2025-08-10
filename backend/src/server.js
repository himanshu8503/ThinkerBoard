import express from "express"
import cors from "cors"
import dotenv from 'dotenv'
import path from "path"

import notesRouter from "./routes/notes.js"
import { connectDB } from "./config/db.js"
import rateLimiter from "./middelware/ratelimiter.js"

dotenv.config()

const app = express()
const port = process.env.PORT || 5000

const __dirname = path.resolve()

if(process.env.NODE_ENV !== "production"){
    app.use(cors({
    origin:"http://localhost:5173",
}))

}


app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.use(rateLimiter);


app.use("/api/notes",notesRouter)

if(process.env.NODE_ENV === "production"){

    app.use(express.static(path.join(__dirname,"../frontend/dist")))

    app.get("*",(req,res) => {
        res.sendFile(path.join(__dirname,"../frontend","dist","index.html"))
    })
}


connectDB().then(() => {
    app.listen(port,() => {
        console.log(`Server is up on port: ${port}`)
    })
})
