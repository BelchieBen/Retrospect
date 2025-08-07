# Stage 1: Dependencies cache
FROM public.ecr.aws/docker/library/node:22-alpine AS dependencies

# Install build dependencies (required for some npm packages)
RUN apk add --no-cache python3 make g++ openssl

# Set the working directory
WORKDIR /usr/src/app

# Copy package files
COPY package*.json ./

# Configure npm for GitHub packages
ARG GITHUB_TOKEN
RUN echo "//npm.pkg.github.com/:_authToken=${GITHUB_TOKEN}" >> ~/.npmrc && \
    echo "@BelchieBen:registry=https://npm.pkg.github.com/" >> ~/.npmrc

# Install ALL dependencies (dev + production)
RUN npm ci --include=dev && \
    rm ~/.npmrc

# Install production dependencies separately for runtime
RUN mkdir -p /tmp/prod-deps
COPY package*.json /tmp/prod-deps/
WORKDIR /tmp/prod-deps

# Configure npm for production dependencies
RUN echo "//npm.pkg.github.com/:_authToken=${GITHUB_TOKEN}" >> ~/.npmrc && \
    echo "@BelchieBen:registry=https://npm.pkg.github.com/" >> ~/.npmrc

ENV NODE_ENV=production
RUN npm ci --only=production && \
    rm ~/.npmrc

# Copy Prisma client from full installation to production deps
RUN cp -r /usr/src/app/node_modules/.prisma /tmp/prod-deps/node_modules/

# Stage 2: Build
FROM public.ecr.aws/docker/library/node:22-alpine AS builder

# Set the working directory
WORKDIR /usr/src/app

# Copy dependencies from cache stage
COPY --from=dependencies /usr/src/app/node_modules ./node_modules

# Copy source code
COPY . .

# Build the application
RUN npm run build

# Stage 3: Production runtime
FROM public.ecr.aws/docker/library/node:22-alpine AS production

# Install minimal runtime dependencies
RUN apk add --no-cache openssl dumb-init

# Create non-root user for security
RUN addgroup -g 1001 -S nodejs && \
    adduser -S nodejs -u 1001

# Set the working directory
WORKDIR /usr/src/app

# Set environment variables
ARG DATABASE_URL
ENV DATABASE_URL=${DATABASE_URL}
ENV NODE_ENV=production

# Copy production dependencies from dependencies stage (includes Prisma engines)
COPY --from=dependencies /tmp/prod-deps/node_modules ./node_modules

# Copy built application from builder stage
COPY --from=builder /usr/src/app/dist ./dist

# Copy package.json for metadata (optional)
COPY --from=builder /usr/src/app/package.json ./package.json

# Set Prisma environment variables for better debugging
ENV PRISMA_QUERY_ENGINE_LIBRARY=/usr/src/app/node_modules/.prisma/client/libquery_engine-linux-musl-openssl-3.0.x.so.node

# Change ownership to nodejs user (after setting permissions)
RUN chown -R nodejs:nodejs /usr/src/app
USER nodejs

# Expose the port
EXPOSE 8000

# Use dumb-init for proper signal handling
ENTRYPOINT ["dumb-init", "--"]

# Start the application
CMD ["node", "dist/index.js"]