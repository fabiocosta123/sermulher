

/* Adiciona um timestamp e remove caracteres especiais/espaços criando um arquivo unico*/
export const generateSafeFileName = (originalName: string): string => {
  const timestamp = Date.now();
  // Remove extensões e caracteres especiais, converte para minúsculas e troca espaços por hífens
  const cleanName = originalName
    .split('.')
    .slice(0, -1)
    .join('.')
    .replace(/[^a-z0-9]/gi, '-')
    .toLowerCase();
    
  const extension = originalName.split('.').pop();
  
  return `${timestamp}-${cleanName}.${extension}`; // Ex: 1714652300-batom-matte.png
};

/* tamanhos recomendados para exibir no Admin */
export const IMAGE_GUIDELINES = {
  PRODUCT: {
    dimensions: "800x800px",
    aspectRatio: "1:1 (Quadrado)",
    maxSize: "2MB"
  },
  BANNER: {
    dimensions: "1920x600px",
    aspectRatio: "3.2:1 (Horizontal)",
    maxSize: "5MB"
  },
  SERVICE: {
    dimensions: "600x400px",
    aspectRatio: "3:2",
    maxSize: "2MB"
  }
};