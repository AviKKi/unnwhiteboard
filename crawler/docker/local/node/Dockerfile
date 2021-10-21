FROM node:12.18.1
WORKDIR /app
COPY ["package.json", "package-lock.json*", "./"]
RUN npm install
# COPY . .
CMD ["npm", "run", "dev-server"]