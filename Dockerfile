# syntax=docker/dockerfile:1


ARG NODE_VERSION=22.14.0

FROM node:${NODE_VERSION}-alpine as base
WORKDIR /usr/src/app
EXPOSE 3000



FROM base as dev
RUN --mount=type=bind,source=package.json,target=package.json \
    --mount=type=bind,source=package-lock.json,target=package-lock.json \
    --mount=type=cache,target=/root/.npm \
    npm ci --include=dev
RUN chown -R node:node /usr/src/app
USER node
COPY . .
CMD npm start


FROM base as prod
RUN --mount=type=bind,source=package.json,target=package.json \
    --mount=type=bind,source=package-lock.json,target=package-lock.json \
    --mount=type=cache,target=/root/.npm \
    npm ci --omit=dev
RUN chown -R node:node /usr/src/app
USER node
COPY . .
CMD node src/index.js
