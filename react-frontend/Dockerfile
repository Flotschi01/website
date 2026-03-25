# --- Stage 1: Build the React App ---
FROM node:20-alpine AS builder

WORKDIR /app
# Copy package files and install dependencies
COPY package*.json ./
RUN npm ci


# You must declare the ARG so the build process can see it
ARG VITE_PB_URL 
# Then set it as an ENV so Vite picks it up during 'npm run build'
ENV VITE_PB_URL=$VITE_PB_URL

# Copy source code and build
COPY . .
RUN npm run build

# --- Stage 2: Serve with Internal Nginx ---
FROM nginx:alpine

# Copy the build output from Stage 1 to Nginx's html folder
# Note: Check your vite.config.js to see if output is 'dist' or 'build'
COPY --from=builder /app/dist /usr/share/nginx/html

# Copy a simple internal config for handling React Router
# (We will create this file in the next sub-step)
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
