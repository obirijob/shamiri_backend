/** @format */

import express from 'express'

const journalRouter = express.Router()

journalRouter.get('/', (_, res) => {
  res.json('GET route')
})

export default journalRouter
