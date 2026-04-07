import { PrismaClient } from '@prisma/client'
import { PrismaNeon } from '@prisma/adapter-neon'
import { Pool, neonConfig } from '@neondatabase/serverless'
import ws from 'ws'

// ambiente Node.js local
neonConfig.webSocketConstructor = ws

const connectionString = `${process.env.DATABASE_URL}`

const globalForPrisma = global as unknown as { prisma: PrismaClient }

// Cria o pool normalmente
const neonPool = new Pool({ connectionString })

// força o tipo para 'any' para evitar o erro de 'PoolConfig'
const adapter = new PrismaNeon(neonPool as any)

export const prisma = globalForPrisma.prisma || new PrismaClient({ adapter })

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma