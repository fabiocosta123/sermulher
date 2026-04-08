// lib/prisma.ts
import { PrismaClient } from '@prisma/client'
import { PrismaNeon } from '@prisma/adapter-neon'
import { Pool, neonConfig } from '@neondatabase/serverless'
import ws from 'ws'

if (typeof window === 'undefined') {
  neonConfig.webSocketConstructor = ws
}

const globalForPrisma = global as unknown as { prisma: PrismaClient }

const createPrisma = () => {
  // Tenta o .env, se não achar, usa a string que funcionou no driver puro
  const connectionString = process.env.DATABASE_URL || "postgresql://neondb_owner:npg_unwEX2V3abDr@ep-steep-thunder-anpvhppy-pooler.c-6.us-east-1.aws.neon.tech/neondb?sslmode=require"

  // Log para você ver no terminal se ele está pegando do .env ou do fallback
  if (!process.env.DATABASE_URL) {
    console.log("⚠️ Aviso: DATABASE_URL não lida do .env, usando fallback manual.");
  }

  const pool = new Pool({ connectionString })
  const adapter = new PrismaNeon(pool as any)

  return new PrismaClient({ adapter })
}

export const prisma = globalForPrisma.prisma || createPrisma()

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma