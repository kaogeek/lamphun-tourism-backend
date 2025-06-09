FROM node:22-slim

RUN apt-get update && \
    apt-get install -y --no-install-recommends \
    build-essential \
    autoconf \
    automake \
    zlib1g-dev \
    libpng-dev \
    nasm \
    bash \
    libvips-dev \
    git && \
    rm -rf /var/lib/apt/lists/*

ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

WORKDIR /opt/app

COPY package.json package-lock.json ./
RUN npm ci 

COPY . .
RUN chmod +x ci/build-plugins.sh
RUN npm run build

EXPOSE 1337
CMD ["npm", "run", "start"]