import express from "express"
import cors from "cors"
import dotenv from 'dotenv'

import notesRouter from "./routes/notes.js"
import { connectDB } from "./config/db.js"
import rateLimiter from "./middelware/ratelimiter.js"

dotenv.config()

const app = express()
const port = process.env.PORT || 5000

app.use(cors({
    origin:"http://localhost:5173",
}))

app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.use(rateLimiter);


app.use("/api/notes",notesRouter)



connectDB().then(() => {
    app.listen(port,() => {
        console.log(`Server is up on port: ${port}`)
    })
})
