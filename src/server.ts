/** @format */

import express from 'express'
import journalRouter from './routes/journals'

const app = express()

const port = 2000

app.use('/journals', journalRouter)

app.listen(port, () => console.log(`App running on port ${port}`))
