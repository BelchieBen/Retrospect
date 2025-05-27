FROM node:22-bookworm-slim

# Set the working directory
WORKDIR /usr/src/app

RUN apt-get update -y && apt-get install -y openssl

# Copy package.json and package-lock.json
COPY package*.json ./

ARG GITHUB_TOKEN
RUN echo "//npm.pkg.github.com/:_authToken=${GITHUB_TOKEN}" >> ~/.npmrc && \
    echo "@BelchieBen:registry=https://npm.pkg.github.com/" >> ~/.npmrc

# Install dependencies
RUN npm install && \
    rm ~/.npmrc

RUN cp -r /usr/src/app/node_modules/.prisma /usr

# Copy the rest of the application code
COPY . .

# Build the TypeScript code
RUN npm run build

# Expose the port the app runs on
EXPOSE 8000

# Command to run the application
CMD ["node", "dist/index.js"]
# CMD ["npm", "run", "start"]