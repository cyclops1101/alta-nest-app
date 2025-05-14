FROM node:24-alpine AS builder
WORKDIR /app
COPY . .
RUN npm install
RUN npm run build