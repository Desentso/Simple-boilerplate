const prisma = require("../database")

const getUser = async ({userId}) => {
  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: {
      id: true,
      name: true,
      email: true,
      createdAt: true,
      updatedAt: true,
      isAdmin: true,
      discountCode: true
    }
  })

  return user
}

module.exports = getUser