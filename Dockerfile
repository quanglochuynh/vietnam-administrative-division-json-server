# Use a lightweight Node.js image as the base
FROM node:18-alpine

# Set the working directory inside the container
WORKDIR /app

# install pnpm
RUN npm install -g pnpm

# Copy package.json and pnpm-lock.yml to the working directory
COPY package.json pnpm-lock.yaml ./

# Install dependencies
RUN pnpm install --frozen-lockfile

# Copy the JSON server files to the working directory
COPY . .

EXPOSE 3000

# Start the JSON server
CMD ["pnpm", "start"]