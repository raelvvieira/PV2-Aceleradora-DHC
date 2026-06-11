# Use the official Node.js 20 slim image
FROM node:20-slim

# Create and define the workspace directory
WORKDIR /app

# Copy both package.json and package-lock.json to leverage Docker layer caching
COPY package*.json ./

# Install both prod and dev dependencies needed for the compilation phase
RUN npm ci

# Copy all source files, templates, and system configuration configurations
COPY . .

# Set build-time environments
ENV NODE_ENV=production

# Build the application (compiles the Vite frontend and bundles the Express backend via esbuild)
RUN npm run build

# Prune development dependencies to keep the runtime container ultra-lightweight
RUN npm prune --omit=dev

# Cloud Run injects the PORT environment variable dynamically, but we define 3000 as a sane default
ENV PORT=3000
EXPOSE 3000

# Run the production build startup script
CMD ["npm", "start"]
