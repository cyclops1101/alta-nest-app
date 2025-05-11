FROM node:24

WORKDIR /app
COPY . .

# Install dependencies for all packages
RUN npm install

# Install client & server deps
RUN cd server && npm install && cd ../client && npm install

# Optional: build client (skip if dev only)
# RUN cd client && npm run build

CMD ["npm", "run", "start"]
