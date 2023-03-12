import express from "express";
import * as dotenv from 'dotenv'
import cors from 'cors'

import connectDB from "./MongoDB/Connect.js";
import dalleRoutes from './Routes/DalleRoutes.js'
import postRoutes from './Routes/PostRoutes.js'

dotenv.config()

const app = express()
app.use(cors())
app.use(express.json({ limit: '50mb' }))

app.get('/', async (req, res) => {
    res.status(200).json({
        message: 'Heyy there, This is a Cat ',
    })
})

let PORT
process.env.STATUS === "development"
    ? (PORT = process.env.DEV_ENDPOINT_URL)
    : (PORT = process.env.PROD_ENDPOINT_URL)

async function StartServer() {

    app.listen(PORT, () => {
        console.log(`Server is in ${process.env.STATUS} mode, listening on port ${PORT}`)
    })
}

StartServer()