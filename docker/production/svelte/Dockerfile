FROM mhart/alpine-node:14.17.3

# install dependencies
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci --production


# Copy all local files into the image.
ARG VITE_API_DOMAIN
ENV VITE_API_DOMAIN $VITE_API_DOMAIN
COPY . .
RUN npm install
RUN npm run build

###
# Only copy over the Node pieces we need
# ~> Saves 35MB
###
FROM mhart/alpine-node:slim-14.17.3

WORKDIR /app
COPY --from=0 /app .
COPY . .

EXPOSE 3000
CMD ["node", "./build"]