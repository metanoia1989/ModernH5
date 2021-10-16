FROM node:14

RUN sed -i "s@http://deb.debian.org@http://mirrors.aliyun.com@g" /etc/apt/sources.list

RUN apt-get update && apt-get install -y \
    libcairo2-dev \
    libjpeg-dev \
    libpango1.0-dev \
    libgif-dev \
    libpng-dev \
    librsvg2-dev \
    build-essential \
    ttf-wqy-microhei \
    g++

ENTRYPOINT []
WORKDIR /bot
COPY package.json .
RUN npm config set registry http://registry.npm.taobao.org

RUN npm install canvas --canvas_binary_host_mirror=https://npm.taobao.org/mirrors/node-canvas-prebuilt/
RUN npm install
# && npm install -g node-gyp
# WORKDIR /bot/node_modules/canvas
# RUN node-gyp rebuild
WORKDIR /bot

CMD npm install --canvas_binary_host_mirror=https://npm.taobao.org/mirrors/node-canvas-prebuilt/ && node index.js
