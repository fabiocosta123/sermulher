// lib/prisma.ts
import { PrismaClient } from '@prisma/client'
import { PrismaNeon } from '@prisma/adapter-neon'
import { Pool, neonConfig } from '@neondatabase/serverless'
import ws from 'ws'

if (typeof window === 'undefined') {
  neonConfig.webSocketConstructor = ws
}

// URL que funcionou no driver puro
const connectionString = "postgresql://neondb_owner:npg_unwEX2V3abDr@ep-steep-thunder-anpvhppy-pooler.c-6.us-east-1.aws.neon.tech/neondb?sslmode=require"

const globalForPrisma = global as unknown as { prisma: PrismaClient }

const createPrisma = () => {
  console.log("🛠️ Tentando conexão com Adaptador Neon...");
  
  const pool = new Pool({ connectionString })
  const adapter = new PrismaNeon(pool as any)

  // No Prisma 6 + Driver Adapters:
  // 1. NÃO passe datasources aqui.
  // 2. O adapter já carrega a conexão do pool.
  return new PrismaClient({ adapter })
}

export const prisma = globalForPrisma.prisma || createPrisma()

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma