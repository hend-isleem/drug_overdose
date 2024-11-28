# Use the Playwright base image
FROM mcr.microsoft.com/playwright:v1.46.0-noble

# Set the working directory
WORKDIR /usr/src/app

# Copy package files and install dependencies
COPY package*.json ./
RUN npm install

# Install Playwright browsers with dependencies
RUN npx playwright install --with-deps

# Copy the rest of the application code
COPY . .

# Expose the port your app runs on
EXPOSE 3000

# Start the application
CMD ["npm", "start"]
