-- CreateTable
CREATE TABLE "Product" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "brand" TEXT,
    "price" DECIMAL(65,30) NOT NULL,
    "imageUrl" TEXT,
    "category" TEXT NOT NULL,
    "finish" TEXT,
    "hexColor" TEXT,
    "skinTone" TEXT,
    "active" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Product_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SiteConfig" (
    "id" INTEGER NOT NULL DEFAULT 1,
    "heroTitle" TEXT NOT NULL DEFAULT 'Sua beleza em evidência',
    "heroSubtitle" TEXT DEFAULT 'Descubra a essência da sua beleza com nossos cosméticos exclusivos.',
    "heroImageUrl" TEXT,
    "featuredTitle" TEXT NOT NULL DEFAULT 'Essenciais para sua Rotina',
    "featuredSubtitle" TEXT DEFAULT 'Uma seleção curada de produtos que combinam alta tecnologia e cuidado artesanal.',
    "heroVideoUrl" TEXT,
    "activeCampaign" TEXT,
    "footerAddress" TEXT DEFAULT 'Registro, São Paulo',
    "footerWhatsapp" TEXT DEFAULT '5513999999999',
    "footerInstagram" TEXT DEFAULT 'sermulher_cosmeticos',
    "footerEmail" TEXT DEFAULT 'contato@sermulher.com.br',
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "SiteConfig_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Admin" (
    "id" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "password" TEXT NOT NULL,

    CONSTRAINT "Admin_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Admin_username_key" ON "Admin"("username");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");
