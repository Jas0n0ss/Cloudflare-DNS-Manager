# Pull base image.
FROM node:20-alpine

WORKDIR /app

# Copy package files and install dependencies
COPY package*.json ./
RUN npm install

# Copy the rest of the application
COPY . .

# Build the web application
RUN cd web-app && npm install && npm run build

# Expose ports
EXPOSE 8080

CMD ["npm", "start"]

VOLUME '/db'