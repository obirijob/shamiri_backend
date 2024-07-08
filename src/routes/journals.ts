/** @format */

import express from 'express'
import prismaClient from '../prisma/prismaClient'

const journalRouter = express.Router()

journalRouter.get('/', async (_, res) => {
  const journals = await prismaClient.journal.findMany({
    include: { categoryPop: true, createdByPop: { select: { username: true } } }
  })
  res.json(journals)
})

export default journalRouter
