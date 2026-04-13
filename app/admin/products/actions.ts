'use server'
import { prisma } from "@/lib/prisma"
import { revalidatePath } from "next/cache"


export async function createProduct(formData: any) {
  try {
    const dataPayload = {
      name: formData.name,
      brand: formData.brand,
      category: formData.category,
      price: parseFloat(formData.price),
      hexColor: formData.hexColor,
      finish: formData.finish,
      skinTone: formData.skinTone,
      imageUrl: formData.imageUrl,
    }

    let product;

    if (formData.id) {
      // MODO EDIÇÃO: Se o ID vier no formulário, atualizamos
      product = await prisma.product.update({
        where: { id: formData.id },
        data: dataPayload,
      })
    } else {
      // MODO CADASTRO: Se não houver ID, criamos um novo
      product = await prisma.product.create({
        data: dataPayload,
      })
    }

    const plainProduct = {
      ...product,
      price: Number(product.price),
      createdAt: product.createdAt.toISOString(),
    }

    revalidatePath('/')
    revalidatePath('/admin/products/list') // Revalida a lista para mostrar o nome atualizado
    
    return { success: true, product: plainProduct }
  } catch (error) {
    console.error("Erro ao processar produto:", error)
    return { success: false, error: "Falha ao salvar os dados." }
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
    const payload = {
      heroTitle: data.heroTitle,
      heroSubtitle: data.heroSubtitle,
      heroImageUrl: data.heroImageUrl,
      // Novos campos aqui:
      featuredTitle: data.featuredTitle,
      featuredSubtitle: data.featuredSubtitle,
    }

    await prisma.siteConfig.upsert({
      where: { id: 1 },
      update: payload,
      create: { id: 1, ...payload },
    })

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

export async function deleteProduct(id: string) {
  try {
    await prisma.product.delete({
      where: { id }
    })
    revalidatePath('/')
    return { success: true }
  } catch (error) {
    console.error("Erro ao excluir:", error)
    return { success: false }
  }
}

export async function getProductById(id: string) {
  try {
    const product = await prisma.product.findUnique({
      where: { id }
    })

    if (!product) return null

    // Convertemos para tipos simples (Decimal -> Number) para evitar erro de serialização
    return {
      ...product,
      price: Number(product.price),
      createdAt: product.createdAt.toISOString()
    }
  } catch (error) {
    console.error("Erro ao buscar produto por ID:", error)
    return null
  }
}