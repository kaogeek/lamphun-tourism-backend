# TODO make Dockerfile to production ready current i will hot fix for fast deploy poc
FROM node:22-alpine
# Installing libvips-dev for sharp Compatibility
RUN apk update && apk add --no-cache build-base gcc autoconf automake zlib-dev libpng-dev nasm bash vips-dev git
ARG NODE_ENV=development
ENV NODE_ENV=${NODE_ENV}

WORKDIR /opt/app

COPY package.json package-lock.json ./
RUN npm install -g node-gyp --legacy-peer-deps
RUN npm ci --legacy-peer-deps

COPY . .

RUN chown -R node:node /opt/app

USER node
RUN ["npm", "run", "build"]
EXPOSE 1337
CMD ["npm", "run", "start"]
