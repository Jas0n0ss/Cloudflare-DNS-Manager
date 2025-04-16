# Step 1: Build the backend application
FROM node:18-alpine

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json to install dependencies
COPY package*.json ./

# Install the dependencies
RUN npm install

# Copy the entire project into the container
COPY . .

# Expose port 3000 for backend API
EXPOSE 3000

# Run the backend application
CMD ["node", "server.js"]

