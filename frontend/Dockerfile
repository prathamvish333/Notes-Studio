FROM node:18-alpine
WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci

COPY . .

RUN npm run build
ENV NODE_ENV production

RUN cp -r public .next/standalone/ 2>/dev/null || true
RUN cp -r .next/static .next/standalone/.next/static

EXPOSE 3000

WORKDIR /app/.next/standalone
CMD ["node", "server.js"]
