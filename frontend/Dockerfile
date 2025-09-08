# # Stage 1: Build
# FROM node:20-slim AS build

# WORKDIR /app

# # Install dependencies
# COPY package*.json ./
# RUN npm install

# # Copy source and build
# COPY . .
# RUN npm run build

# # Stage 2: Serve with lightweight webserver (nginx)
# FROM nginx:alpine

# # Copy built files from build stage
# COPY --from=build /app/dist /usr/share/nginx/html

# # Expose frontend port
# EXPOSE 80

# # Default command
# CMD ["nginx", "-g", "daemon off;"]



# Stage 1: Build React app
FROM node:20-alpine AS build
WORKDIR /app

# Copy package files
COPY package.json package-lock.json ./

# Install dependencies
RUN npm install

# Copy everything (including index.html)
COPY . .

# Build production
RUN npm run build

# Stage 2: Serve with Nginx
FROM nginx:stable-alpine
COPY --from=build /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
