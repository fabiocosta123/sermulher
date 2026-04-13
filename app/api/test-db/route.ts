// app/api/test-db/route.ts
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    // Agora usando o Prisma de verdade!
    const result = await prisma.$queryRaw`SELECT NOW() as tempo_prisma`;
    
    return NextResponse.json({ 
      status: "Prisma Conectado!", 
      data: result 
    });
  } catch (error: any) {
    return NextResponse.json({ 
      status: "Erro no Prisma", 
      message: error.message 
    }, { status: 500 });
  }
}