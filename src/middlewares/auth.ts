/** @format */
import jwt from 'jsonwebtoken'
import prismaClient from '../prisma/prismaClient'
import type { User } from '../routes/auth'

const secretKey = process.env.SECRET_KEY ?? ''

async function auth(req: any, res: any, next: any) {
  const authToken: string | null = req.headers['auth-token']

  if (!authToken) {
    return res.status(401).json({ message: 'Auth Token is missing' })
  }

  try {
    var decoded = (await jwt.verify(authToken, secretKey)) as User

    const user = await prismaClient.user.findUnique({
      where: { username: decoded.username }
    })

    if (user) {
      req.user = user
      next()
    } else {
      res.status(401).json({ error: 'Invalid Auth Token' })
    }
  } catch (ex) {
    // we can do logging here
    console.log(ex)
    res.status(500).json({ error: 'invalid token' })
  }
}

export default auth
