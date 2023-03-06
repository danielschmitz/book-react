import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  const users = await prisma.user.findMany(
    {
      include: {
        posts: true
      }

    }
  )
  console.dir(users, { depth: null })

  // const user = await prisma.user.create({
  //   data: {
  //     name: 'John Doe',
  //     email: 'j@j.com',
  //     posts: {
  //       create: {
  //         title: 'Hello World',
  //       }
  //     }
  //   },  
  // })
  // console.log(user)
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })