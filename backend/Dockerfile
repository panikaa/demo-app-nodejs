# -------------------------------
# Stage 1: Build
# -------------------------------
FROM node:25-trixie-slim AS build

WORKDIR /app

RUN apt update
RUN apt upgrade
RUN apt install libssl3

COPY package*.json ./
RUN npm install

COPY prisma ./prisma
COPY tsconfig.json ./
COPY src ./src

ENV NODE_TLS_REJECT_UNAUTHORIZED=0
# Generate Prisma client
RUN npx prisma generate

# Build TypeScript
RUN npm run build


# -------------------------------
# Stage 2: Production Image
# -------------------------------
FROM node:25-trixie-slim

WORKDIR /app

RUN apt update
RUN apt upgrade
RUN apt install libssl3

COPY package*.json ./
COPY .env.example .env
RUN npm install --omit=dev

ENV NODE_TLS_REJECT_UNAUTHORIZED=0
# Generate prisma for prod also
COPY prisma ./prisma
RUN npx prisma generate

COPY --from=build /app/dist ./dist
COPY --from=build /app/node_modules/.prisma ./node_modules/.prisma

RUN npm r -g npm # removing due to https://medium.com/@balazs.csaba.diy/whats-this-glob-npm-madness-suddenly-every-node-js-image-is-vulnerable-but-why-1ba1b0cbad97

ENV PORT=3000

EXPOSE 3000

CMD ["npm", "start"]
