FROM node:slim as nestjs-build
WORKDIR /app
RUN npm config set registry https://registry.npmmirror.com
RUN npm i pnpm -g
COPY ./package.json /app/package.json
COPY ./pnpm-lock.yaml /app/pnpm-lock.yaml
RUN pnpm i
COPY . /app
RUN pnpm build

FROM node:slim as nestjs-prod
WORKDIR /app
RUN npm config set registry https://registry.npmmirror.com
RUN npm i pnpm -g
COPY ./package.json /app/package.json
COPY ./pnpm-lock.yaml /app/pnpm-lock.yaml
RUN pnpm i -P
COPY --from=nestjs-build /app/dist /app/dist
CMD node dist/main.js
EXPOSE 4936
