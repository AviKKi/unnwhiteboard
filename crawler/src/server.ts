import express from "express";
import { json } from 'body-parser'
import repl from 'repl'
import cors from 'cors'

import connectDB from "./config/database";
import Company from './routes/Company'
import JobPost from './routes/JobPost'

const app = express()
app.use(cors())
app.use(json())

connectDB()

app.get('/', (req, res) => {
    res.json({ "message": "Hello World 1" })
})

app.use("/", Company)
app.use("/", JobPost)

if (process.argv.length > 2 && process.argv[2] === "shell") {
    repl.start('> ')
} else {
    app.listen(8000, () => {
        console.log('Server is listening on port 8000')
    })
}