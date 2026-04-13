
---

# 🌸 SerMulher - PWA E-commerce & Admin

O **SerMulher** é uma plataforma de e-commerce progressiva (PWA) de alta performance, dedicada ao mercado de cosméticos premium. O projeto une uma experiência de compra fluida para a usuária final com um painel administrativo robusto para gestão de inventário e identidade visual.

---

## 🚀 Visão Geral do Projeto

O sistema foi desenhado para ser rápido, instalável e facilmente gerenciável. 
* **Storefront:** Interface minimalista e sofisticada com foco em acessibilidade e conversão.
* **PWA (Progressive Web App):** Suporte offline básico e instalação em dispositivos móveis, eliminando a barreira das lojas de aplicativos tradicionais.
* **Painel Administrativo:** Controle total sobre produtos (cores, acabamentos, tons de pele), preços e banners promocionais.

---

## 📸 Inteligência de Gestão de Imagens (Cloudinary)

Para garantir que o site carregue instantaneamente em qualquer conexão (especialmente em redes móveis), implementamos uma **IA de captura e otimização de imagens** via Cloudinary:

* **Otimização Automática:** As imagens subidas pelo Admin são automaticamente convertidas para formatos modernos (como WebP ou AVIF) e redimensionadas dinamicamente.
* **Upload Inteligente:** Interface "drag-and-drop" no painel admin com suporte a filtros e ajustes em tempo real antes do salvamento no banco de dados.
* **CDN Global:** Entrega de conteúdo ultra-rápida, garantindo que as fotos dos produtos apareçam sem atraso para a cliente.

---

## 🛠️ Stack Tecnológica (Tech Stack)

O projeto utiliza as tecnologias mais modernas do mercado para garantir escalabilidade e segurança:

### **Front-end & Framework**
* **Next.js (App Router):** Framework React para produção com Server Components.
* **Tailwind CSS:** Estilização utilitária para um design system consistente.
* **TypeScript:** Tipagem estática para um código livre de erros comuns.
* **Lucide React:** Conjunto de ícones minimalistas.

### **Back-end & Database**
* **Prisma ORM:** Mapeamento objeto-relacional para consultas eficientes ao banco.
* **Neon DB (PostgreSQL):** Banco de dados serverless de baixa latência.
* **Cloudinary SDK:** Gestão e entrega inteligente de mídia.

### **Infraestrutura & PWA**
* **Service Workers:** Scripts em segundo plano para funcionalidade PWA.
* **Vercel:** Plataforma de deploy e monitoramento contínuo.

---

## 🎨 Design System
* **Cor Principal:** `Rose-600` (Sofisticação e Identidade Feminina).
* **Tipografia:** `Playfair Display` (Títulos com serifa) e `Inter` (Leitura moderna).

---

## 🏗️ Como rodar o projeto

1. **Clone o repositório:**
   ```bash
   git clone https://github.com/seu-usuario/sermulher.git
   ```
2. **Instale as dependências:**
   ```bash
   npm install --legacy-peer-deps
   ```
3. **Configure as variáveis de ambiente:**
   Crie um arquivo `.env` com as chaves do `DATABASE_URL` (Neon) e as chaves do Cloudinary.
4. **Sincronize o banco:**
   ```bash
   npx prisma db push
   ```
5. **Inicie o servidor de desenvolvimento:**
   ```bash
   npm run dev
   ```

---
*Desenvolvido por Fábio Costa Silva - Full Stack Developer*