# Step 1: Build the React application
FROM node:18-alpine as build

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json to install dependencies
COPY package*.json ./

# Install the dependencies
RUN npm install

# Copy the entire project into the container
COPY . .

# Build the React application for production
RUN npm run build

# Step 2: Set up Nginx to serve the built React application
FROM nginx:alpine

# Copy the build files from the previous image
COPY --from=build /app/build /usr/share/nginx/html

# Expose port 80 for accessing the application
EXPOSE 80

# Run Nginx in the foreground
CMD ["nginx", "-g", "daemon off;"]

