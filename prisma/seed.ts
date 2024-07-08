/** @format */

import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  await prisma.category.createMany({
    data: [{ name: 'Personal' }, { name: 'Work' }, { name: 'Travel' }],
    skipDuplicates: true
  })

  await prisma.journal.createMany({
    data: [
      {
        title: 'First Journal',
        content: 'This is some content',
        category: 1,
        createdAt: new Date(2023, 12, 14, 22, 46, 0, 0)
      },
      {
        title: 'Second Journal',
        content: 'This is another journal with a very long content',
        category: 2,
        createdAt: new Date(2024, 2, 14, 12, 46, 0, 0)
      },
      {
        title: 'Third Journal',
        content:
          'This is a journal with a short content. This content needs to be long so that we can visualize how the clipping of the content will work',
        category: 3,
        createdAt: new Date(2024, 6, 14, 12, 46, 0, 0)
      },
      {
        title: 'Third Journal',
        content:
          'This is a journal with a short content. This content needs to be long so that we can visualize how the clipping of the content will work',
        category: 2,
        createdAt: new Date(2024, 6, 12, 12, 46, 0, 0)
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
