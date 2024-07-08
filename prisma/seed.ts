/** @format */

import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  await prisma.category.createMany({
    data: [{ name: 'Personal' }, { name: 'Work' }, { name: 'Travel' }],
    skipDuplicates: true
  })

  // default user
  await prisma.user.create({
    data: {
      username: 'obirijob',
      password: '$2b$10$DZtkmgCHrrd7UjY7NHn1p.XMaTJOuPcLG79U0PESevYBilQS6o1rm'
    }
  })

  await prisma.journal.createMany({
    data: [
      {
        title: 'First Journal',
        content: 'This is some content',
        category: 1,
        createdAt: new Date(2023, 11, 14, 22, 46, 0, 0),
        createdBy: 1
      },
      {
        title: 'Second Journal',
        content: 'This is another journal with a very long content',
        category: 2,
        createdAt: new Date(2024, 2, 14, 12, 46, 0, 0),
        createdBy: 1
      },
      {
        title: 'Third Journal',
        content:
          'This is a journal with a short content. This content needs to be long so that we can visualize how the clipping of the content will work',
        category: 3,
        createdAt: new Date(2024, 5, 14, 12, 46, 0, 0),
        createdBy: 1
      },
      {
        title: 'Third Journal',
        content:
          'This is a journal with a short content. This content needs to be long so that we can visualize how the clipping of the content will work',
        category: 2,
        createdAt: new Date(2024, 6, 2, 12, 46, 0, 0),
        createdBy: 1
      }
    ]
  })
}

main()
  .catch(e => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
