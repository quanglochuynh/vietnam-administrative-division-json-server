# Base image
FROM node:18-alpine

# Working directory
WORKDIR /app

# Install pnpm
RUN npm install -g pnpm

# Copy package.json and lockfile
COPY package.json pnpm-lock.yaml ./

# Install dependencies
RUN pnpm install --production

# Copy the rest of the project files
COPY . .

# Expose the port
EXPOSE 2000

# Start the JSON server
CMD ["pnpm", "start"]
