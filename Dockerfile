# Base image
FROM node:lts

# Set env
ENV NODE_ENV=production

# Create app directory
WORKDIR /app

# Install dependencies first (better cache)
COPY package*.json ./
RUN npm install --omit=dev --no-audit --no-fund

# Bundle app source
COPY . .

# Use non-root user provided by the image
USER node

# Expose HTTP port (the app uses PORT env or defaults to 3000)
EXPOSE 3000

# Start the server
CMD ["npm", "start"]
