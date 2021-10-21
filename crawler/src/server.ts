import express from "express";
import { json } from 'body-parser'

const app = express()
app.use(json())

app.get('/', (req, res) => {
    res.json({ "message": "Hello World 1" })
})

app.listen(8000, () => {
    console.log('Server is listening on port 8000')
})