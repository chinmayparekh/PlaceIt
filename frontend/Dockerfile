# # Use Node.js as the base image
# FROM node:17-alpine3.15

# # Set the working directory inside the container
# WORKDIR /app

# # Copy package.json and package-lock.json to install dependencies
# COPY package*.json ./

# # Install dependencies
# RUN npm install

# # Copy the rest of the application files
# COPY . .

# # Build the React app (change "build" to the actual build command for your project)
# RUN npm run build

# Use Node.js as the base image
FROM node:17-alpine3.15

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json to install dependencies
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application files
COPY . .

# Set the command to start your application
CMD ["npm", "start"]

# sudo docker build -t frontend .
# sudo docker run -it -p 3000:3000 --name frontend_container frontend sh
# sudo docker rm frontend_container