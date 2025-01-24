# Etapa 1: Construcción
FROM node:18 AS builder

# Establecer el directorio de trabajo
WORKDIR /app

# Copiar los archivos del proyecto
COPY package*.json ./
COPY tsconfig*.json ./
COPY src ./src

# Instalar dependencias
RUN npm install --force

# Construir la aplicación
RUN npm run build

# Etapa 2: Imagen de producción
FROM node:18-alpine

# Establecer el directorio de trabajo
WORKDIR /app

# Copiar las dependencias y el build desde la etapa anterior
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/dist ./dist

# Exponer el puerto de la aplicación
EXPOSE 3000

# Comando por defecto para ejecutar la aplicación
CMD ["node", "dist/main"]