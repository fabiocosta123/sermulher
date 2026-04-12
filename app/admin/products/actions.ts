'use server'
import { prisma } from "@/lib/prisma"
import { revalidatePath } from "next/cache"

export async function createProduct(formData: any) {
  try {
    const product = await prisma.product.create({
      data: {
        name: formData.name,
        brand: formData.brand,
        category: formData.category,
        price: parseFloat(formData.price),
        hexColor: formData.hexColor,
        finish: formData.finish,
        skinTone: formData.skinTone,
        imageUrl: formData.imageUrl,
      },
    })

    // CORREÇÃO: Transformamos o Decimal em Number e limpamos o objeto
    const plainProduct = {
      ...product,
      price: Number(product.price), 
      createdAt: product.createdAt.toISOString(), // Datas também dão erro às vezes
    }

    revalidatePath('/')
    return { success: true, product: plainProduct }
  } catch (error) {
    console.error("Erro:", error)
    return { success: false, error: "Falha ao salvar." }
  }
}