# Estágio 1: Build (Node.js)
FROM node:26-alpine AS builder
WORKDIR /app

# Copia os arquivos de dependência e instala
COPY package*.json ./
RUN npm ci 

# Copia o código fonte e faz o build de produção
COPY . .
RUN npm run build --configuration=production

# Estágio 2: Servidor Web (Nginx)
FROM nginx:alpine

# Copia a nossa configuração de roteamento
COPY nginx.conf /etc/nginx/conf.d/default.conf

# ⚠️ ATENÇÃO AQUI: O caminho do build muda dependendo da versão do Angular.
# Se for Angular 17+, geralmente o build vai para dist/NOME-DO-PROJETO/browser
# Se for Angular 16 ou menor, vai para dist/NOME-DO-PROJETO
# Copia os arquivos estáticos gerados no Estágio 1 para o Nginx
COPY --from=builder /app/dist/frontend/browser /usr/share/nginx/html

EXPOSE 80