# Use an official Node runtime as a parent image
FROM node:20.9.0

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json (or yarn.lock if you use yarn)
COPY package*.json ./


COPY . .
RUN npm install
RUN npm install -g @angular/cli


EXPOSE 5173

CMD ["ng", "serve", "--host", "0.0.0.0", "--poll", "2000", "--disable-host-check", "--port", "5173"]

