# ==========================================
# STAGE 1: Dependencies (deps)
# ==========================================
FROM node:20-alpine AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app
COPY package.json package-lock.json* ./
RUN npm ci

# ==========================================
# STAGE 2: Builder
# ==========================================
FROM node:20-alpine AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# MENANGKAP VARIABEL ENVIRONMENT SAAT BUILD
# Kita buat ARG agar Docker bisa menerima file env saat perintah build dijalankan
ARG RESEND_API_KEY
ARG CONTACT_TO_EMAIL
ENV RESEND_API_KEY=$RESEND_API_KEY
ENV CONTACT_TO_EMAIL=$CONTACT_TO_EMAIL

ARG APP_VERSION=1.0.0
ENV NEXT_PUBLIC_APP_VERSION=$APP_VERSION

# Proses build Next.js (tidak akan error lagi karena API key sudah ada)
RUN npm run build

# ==========================================
# STAGE 3: Runner (Image Akhir)
# ==========================================
FROM node:20-alpine AS runner
WORKDIR /app

ENV NODE_ENV=production
ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs
EXPOSE 3000

CMD ["node", "server.js"]