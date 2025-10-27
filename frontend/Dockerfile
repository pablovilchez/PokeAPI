# Usa la imagen de Node
FROM node:20-alpine
WORKDIR /app

# Copia solo package.json para cachear las dependencias
COPY package*.json ./
RUN npm install

# Copia el resto del código
COPY . .

# Expone el puerto de Vite
EXPOSE 5173

# Comando por defecto (que será sobreescrito por el docker-compose)
CMD ["npm", "run", "dev", "--", "--host"]