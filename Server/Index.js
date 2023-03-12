import express from "express";
import * as dotenv from 'dotenv'
import cors from 'cors'

dotenv.config()

const app = express()
app.use(cors())
app.use(express.json({ limit: '50mb' }))

app.get('/', async (req, res) => {
    res.status(200).json({
        message: 'Hello from DALL.E!',
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