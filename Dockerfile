FROM node:18.16.1-alpine

# Add a work directory
WORKDIR /app

# Cache and Install dependencies
COPY package.json .

RUN npm i -g npm && npm install --quiet --force && rm -rf /tmp/*

EXPOSE 3000

# Copy app files
COPY . .

# Start the app
CMD ["npm", "run", "dev"]
