# -----------------------------
# Stage 1 - Build
# -----------------------------
FROM harbor.emea.ocp.int.kn/dockerhub/node:18-alpine AS build

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build


# -----------------------------
# Stage 2 - Nginx production
# -----------------------------
FROM harbor.emea.ocp.int.kn/dockerhub/nginx:alpine


# Remove default configuration
RUN rm -rf /usr/share/nginx/html/*

# Copy built files
COPY --from=build /app/dist /usr/share/nginx/html

# Custom SPA routing support
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
