const { PrismaClient } = require('@prisma/client')

const settings = process.env.NODE_ENV === "development"
  ? {
      log: ['query', 'info', "warn", "error"]
    }
  : {}

const prisma = new PrismaClient(settings)

module.exports = prisma