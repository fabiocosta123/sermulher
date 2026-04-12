'use server'
import { prisma } from "@/lib/prisma"
import { revalidatePath } from "next/cache"

// Função para SALVAR
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

    const plainProduct = {
      ...product,
      price: Number(product.price), 
      createdAt: product.createdAt.toISOString(),
    }

    revalidatePath('/')
    return { success: true, product: plainProduct }
  } catch (error) {
    console.error("Erro:", error)
    return { success: false, error: "Falha ao salvar." }
  }
}

// FUNÇÃO PARA BUSCAR 
export async function getProducts() {
  try {
    const products = await prisma.product.findMany({
      orderBy: { 
        createdAt: 'desc' 
      }
    })

    // Converte Decimal para Number para o Next.js aceitar na Home
    return products.map(product => ({
      ...product,
      price: Number(product.price),
      createdAt: product.createdAt.toISOString()
    }))
  } catch (error) {
    console.error("Erro ao buscar produtos:", error)
    return []
  }
}

export async function updateSiteConfig(data: any) {
  try {
    
    const existingConfig = await prisma.siteConfig.findFirst()

    if (existingConfig) {
      await prisma.siteConfig.update({
        where: { id: existingConfig.id },
        data: {
          heroTitle: data.heroTitle,
          heroSubtitle: data.heroSubtitle,
          heroImageUrl: data.heroImageUrl,
        }
      })
    } else {
      await prisma.siteConfig.create({
        data: {
          heroTitle: data.heroTitle,
          heroSubtitle: data.heroSubtitle,
          heroImageUrl: data.heroImageUrl,
        }
      })
    }

    revalidatePath('/')
    return { success: true }
  } catch (error) {
    console.error("Erro ao atualizar config:", error)
    return { success: false }
  }
}

export async function getSiteConfig() {
  try {
    const config = await prisma.siteConfig.findFirst();
    return config;
  } catch (error) {
    console.error("Erro ao buscar configurações do site:", error);
    return null;
  }
}