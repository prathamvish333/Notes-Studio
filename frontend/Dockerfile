FROM node:18-alpine

WORKDIR /app

# Install dependencies (utilizing Docker caching)
COPY package.json package-lock.json ./
RUN npm ci

# Copy the rest of the application code
COPY . .

# Build the Next.js application for production
RUN npm run build
ENV NODE_ENV production

# Next.js standalone also needs the public and static folders
RUN cp -r public .next/standalone/ 2>/dev/null || true
RUN cp -r .next/static .next/standalone/.next/static

# Expose the Next.js default port
EXPOSE 3000

# Run the standalone server built by Next.js
WORKDIR /app/.next/standalone
CMD ["node", "server.js"]
