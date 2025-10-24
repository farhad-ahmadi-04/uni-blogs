# Use latest stable Node.js (LTS) version
FROM node:22-alpine

# Set working directory inside container
WORKDIR /app

# Copy package files first for better caching
COPY package.json pnpm-lock.yaml* ./

# Install pnpm globally
RUN npm install -g pnpm

# Install dependencies (all deps so both dev/prod work)
RUN pnpm install

# Copy the rest of your app
COPY . .

# Allow switching between development and production
ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

# Only build in production mode
RUN if [ "$NODE_ENV" = "production" ]; then pnpm run build; fi

# Expose Next.js default port
EXPOSE 3000

# Run the proper command based on NODE_ENV
CMD ["sh", "-c", "if [ \"$NODE_ENV\" = \"production\" ]; then pnpm start; else pnpm run dev; fi"]
