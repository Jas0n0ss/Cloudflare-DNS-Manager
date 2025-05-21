# Use Node.js 20 Alpine as the base image
FROM node:20-alpine

# Set working directory
WORKDIR /app

# Install dependencies
COPY package*.json ./
RUN npm install

# Copy application source
COPY . .

# Build the frontend
RUN cd web-app && npm install && npm run build

# Expose app port
EXPOSE 8080

# Start the application
CMD ["npm", "start"]

# Persistent data volume
VOLUME '/db'