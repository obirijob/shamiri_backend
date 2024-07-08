/** @format */

import express from 'express'
import prismaClient from '../prisma/prismaClient'

const journalRouter = express.Router()

journalRouter.get('/', async (req, res) => {
  const journals = await prismaClient.journal.findMany({
    select: {
      id: false,
      title: true,
      content: true,
      categoryPop: {
        select: {
          id: true,
          name: true
        }
      },
      createdByPop: {
        select: {
          username: true
        }
      },
      createdAt: true
    },
    orderBy: {
      createdAt: 'desc'
    }
  })

  return res.json(journals)
})

journalRouter.get('/byCategory/:categoryId', async (req, res) => {
  const journals = await prismaClient.journal.findMany({
    where: {
      category: parseInt(req.params.categoryId)
    },
    select: {
      id: false,
      title: true,
      content: true,
      categoryPop: {
        select: {
          id: true,
          name: true
        }
      },
      createdByPop: {
        select: {
          username: true
        }
      },
      createdAt: true
    },
    orderBy: {
      createdAt: 'desc'
    }
  })

  return res.json(journals)
})

journalRouter.get('/:journalId', async (req, res) => {
  const journal = await prismaClient.journal.findFirst({
    where: {
      category: parseInt(req.params.journalId)
    },
    select: {
      id: false,
      title: true,
      content: true,
      categoryPop: {
        select: {
          id: true,
          name: true
        }
      },
      createdByPop: {
        select: {
          username: true
        }
      },
      createdAt: true
    },
    orderBy: {
      createdAt: 'desc'
    }
  })

  if (!journal) return res.status(404).json({ error: 'Journal not found' })

  return res.json(journal)
})

journalRouter.post('/', async (req: any, res) => {
  const { title, content, category } = req.body
  const userId = req.user.id

  if (title.trim().length < 1) {
    return res.status(400).json({ error: 'Title is required' })
  }

  if (content.trim().length < 1) {
    return res.status(400).json({ error: 'Content is required' })
  }

  const dbCat = prismaClient.category.findFirst({
    where: {
      id: parseInt(category)
    }
  })

  if (!dbCat) {
    // we can add it here and continue
    // but it is not important now
    return res.status(404).json({ error: 'Category not found' })
  }

  const journal = await prismaClient.journal.create({
    data: {
      title,
      content,
      category: parseInt(category),
      createdBy: parseInt(userId)
    },
    select: {
      id: false,
      title: true,
      content: true,
      categoryPop: {
        select: {
          id: true,
          name: true
        }
      },
      createdByPop: {
        select: {
          username: true
        }
      },
      createdAt: true
    }
  })

  return res.json(journal)
})

journalRouter.put('/', async (req, res) => {
  const { title, content, category, id } = req.body

  const journal = await prismaClient.journal.update({
    where: {
      id: parseInt(id)
    },
    data: {
      title,
      content,
      category: parseInt(category)
    },
    select: {
      id: false,
      title: true,
      content: true,
      categoryPop: {
        select: {
          id: true,
          name: true
        }
      },
      createdByPop: {
        select: {
          username: true
        }
      },
      createdAt: true
    }
  })

  return res.json(journal)
})

journalRouter.delete('/:journalId', async (req, res) => {
  const journal = await prismaClient.journal.delete({
    where: {
      id: parseInt(req.params.journalId)
    },
    select: {
      id: false,
      title: true,
      content: true,
      categoryPop: {
        select: {
          id: true,
          name: true
        }
      },
      createdByPop: {
        select: {
          username: true
        }
      },
      createdAt: true
    }
  })
  return res.json(journal)
})

journalRouter.post('/addCategory', async (req, res) => {
  const { name } = req.body
  const isIn = await prismaClient.category.findFirst({
    where: {
      name
    }
  })

  if (isIn) {
    return res.status(400).json({ error: 'Category already exists' })
  }

  const category = await prismaClient.category.create({
    data: {
      name
    }
  })
  return res.json(category)
})

export default journalRouter
