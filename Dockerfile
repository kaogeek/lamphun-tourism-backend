# TODO make Dockerfile to production ready current i will hot fix for fast deploy poc
FROM node:22-alpine

RUN apk update && apk add --no-cache build-base gcc autoconf automake zlib-dev libpng-dev nasm bash vips-dev git

ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

WORKDIR /opt/app

COPY package.json package-lock.json ./
RUN npm ci --legacy-peer-deps

COPY . .
RUN npm i -g @strapi/sdk-plugin --legacy-peer-deps
RUN chmod +x ci/build-plugins.sh
RUN npm run build

EXPOSE 1337
CMD ["npm", "run", "start"]