FROM node:24-alpine AS builder

WORKDIR /app
COPY . .
RUN npm install

RUN npx nest build
RUN npm run postbuild