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