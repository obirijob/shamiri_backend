/** @format */

import express from 'express'
import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

const authRouter = express.Router()
const prisma = new PrismaClient()
const saltRounds = 10
const secretKey = process.env.SECRET_KEY ?? ''

interface User {
  username: string
  password: string
}

authRouter.post('/signup', async (req, res) => {
  const { username, password } = req.body

  if (username.length < 3) {
    return res
      .status(400)
      .json({ error: 'Username must be at least 3 characters' })
  }

  if (password.length < 4) {
    return res
      .status(400)
      .json({ error: 'Password must be at least 4 characters' })
  }

  const isFound: User | null = await prisma.user.findFirst({
    where: { username }
  })

  if (isFound) {
    return res.status(409).json({ error: 'Username already in use' })
  }

  var hashedPassword = await bcrypt.hash(password, saltRounds)
  prisma.user
    .create({
      data: {
        username,
        password: hashedPassword
      }
    })
    .then(user => {
      res.json({ username: user.username })
    })
    .catch(err => {
      res.status(500).json(err)
    })
})

authRouter.post('/signin', async (req, res) => {
  const { username, password } = req.body

  const user: User | null = await prisma.user.findFirst({
    where: { username }
  })

  if (!user) {
    return res.status(401).json({ error: 'Invalid username or password' })
  }

  const passwordCorrect =
    user === null ? false : await bcrypt.compare(password, user.password)

  if (!passwordCorrect) {
    return res.status(401).json({ error: 'Invalid username or password' })
  }

  const authToken = await jwt.sign({ username }, secretKey)

  res.header('auth-token', authToken).json({ username: user.username })
})

export default authRouter
