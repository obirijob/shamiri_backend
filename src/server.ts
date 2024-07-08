/** @format */

import express from 'express'
import journalRouter from './routes/journals'
import authRouter from './routes/auth'
import bodyParser from 'body-parser'
import cors from 'cors'

const app = express()

const port = 2000

// middlewares
app.use(bodyParser.json())
app.use(cors())

app.use('/journals', journalRouter)
app.use('/auth', authRouter)

app.listen(port, () => console.log(`App running on port ${port}`))
