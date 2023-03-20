FROM node:16
WORKDIR /app

# Copy the package.json and package-lock.json files to the container
COPY package*.json ./

# Install the dependencies
RUN npm install

# Copy the public folder to the container
COPY public/ ./public/

# Copy the pages to the container
COPY pages/ ./pages/

# Copy the rest of the app's source code to the container
COPY .env/ ./

# Build the app
RUN npm run build

CMD npm run dev

# Expose port 3000
EXPOSE 3000