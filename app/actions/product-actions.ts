'use server'

import { prisma } from "@/lib/prisma" // Ajuste conforme seu caminho de instância do Prisma
import { revalidatePath } from "next/cache"

export async function createProduct(formData: FormData) {
  const name = formData.get("name") as string
  const price = parseFloat(formData.get("price") as string)
  const description = formData.get("description") as string
  const category = formData.get("category") as string;

  await prisma.product.create({
    data: {
      name,
      price,
      description,
      category
    },
  })

  revalidatePath("/admin/products") // Atualiza a lista de produtos na interface
}