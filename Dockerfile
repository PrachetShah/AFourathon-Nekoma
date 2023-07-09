# Fetching the latest node image on alpine linux
FROM node:19-alpine AS builder
# Setting up the work directory
WORKDIR /app
# Installing dependencies
COPY package.json .
COPY package-lock.json .
RUN npm install --legacy-peer-deps
# Copying all the files in our project
COPY . .
RUN npm run build

# Stage 2
FROM nginx:1.19.0
WORKDIR /usr/share/nginx/html
RUN echo "website live on localhost:8080"
RUN rm -rf ./*
COPY --from=builder /app/build .
ENTRYPOINT ["nginx", "-g", "daemon off;"]