# ==============================================================================
# 🌾 Ruthved Organic — Production Dockerfile
# Multi-stage build for minimal image size, high security, and fast execution
# ==============================================================================

# --- STAGE 1: Base Dependencies ---
FROM node:20-alpine AS base
WORKDIR /app
RUN apk add --no-cache openssl libc6-compat
COPY package*.json ./
COPY tsconfig.json ./

# --- STAGE 2: Build & Prune ---
FROM base AS build
WORKDIR /app
COPY prisma ./prisma/
RUN npm ci
RUN npx prisma generate
COPY src ./src/
RUN npm run build

# --- STAGE 3: Production Runner ---
FROM node:20-alpine AS runner
WORKDIR /app

ENV NODE_ENV=production
ENV PORT=5000

# Install OpenSSL for Prisma engine compatibility
RUN apk add --no-cache openssl libc6-compat curl

# Create non-root application user for defense-in-depth
RUN addgroup --system --gid 1001 nodejs && \
    adduser --system --uid 1001 ruthved

# Copy package specifications and install production dependencies only
COPY package*.json ./
RUN npm ci --only=production && npm cache clean --force

# Copy generated Prisma Client from build stage
COPY --from=build /app/node_modules/.prisma ./node_modules/.prisma
COPY --from=build /app/node_modules/@prisma ./node_modules/@prisma
COPY --from=build /app/prisma ./prisma

# Copy compiled TypeScript code
COPY --from=build /app/dist ./dist

# Create uploads directory and set permissions
RUN mkdir -p /app/uploads && chown -R ruthved:nodejs /app

USER ruthved

EXPOSE 5000

HEALTHCHECK --interval=30s --timeout=5s --start-period=10s --retries=3 \
  CMD curl -f http://localhost:5000/health || exit 1

CMD ["node", "dist/server.js"]
