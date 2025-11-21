# -------------------------------
# Stage 1: Build
# -------------------------------
FROM harbor.emea.ocp.int.kn/dockerhub/node:20-bullseye-slim AS build

WORKDIR /app

RUN apt install libssl1.1

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
FROM harbor.emea.ocp.int.kn/dockerhub/node:20-bullseye-slim

WORKDIR /app

RUN apt install libssl1.1

COPY package*.json ./
COPY .env.example .env
RUN npm install --omit=dev

ENV NODE_TLS_REJECT_UNAUTHORIZED=0
# Generate prisma for prod also
COPY prisma ./prisma
RUN npx prisma generate

COPY --from=build /app/dist ./dist
COPY --from=build /app/node_modules/.prisma ./node_modules/.prisma

ENV PORT=3000

EXPOSE 3000

CMD ["npm", "start"]
