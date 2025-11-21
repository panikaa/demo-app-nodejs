# -------------------------------
# Stage 1: Build
# -------------------------------
FROM harbor.emea.ocp.int.kn/dockerhub/node:18-alpine AS build

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY tsconfig.json ./
COPY src ./src

RUN npm run build


# -------------------------------
# Stage 2: Production Image
# -------------------------------
FROM harbor.emea.ocp.int.kn/dockerhub/node:18-alpine

WORKDIR /app

# Only copy built files and package.json
COPY package*.json ./
RUN npm install --omit=dev

COPY --from=build /app/dist ./dist

ENV PORT=3000

EXPOSE 3000

CMD ["npm", "start"]
