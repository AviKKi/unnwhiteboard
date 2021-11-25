FROM node:14.18.1-alpine as build
WORKDIR /usr
COPY package.json ./
COPY tsconfig.json ./
COPY src ./src
RUN ls -a
RUN npm install
RUN npm run build


FROM node:14.18.1-alpine
WORKDIR /usr
COPY package.json ./
RUN npm install --only=production
COPY --from=build /usr/build .
RUN npm install pm2 -g
EXPOSE 8000
CMD ["pm2-runtime","server.js"]