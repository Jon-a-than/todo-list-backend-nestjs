FROM node:slim
WORKDIR /app
COPY . /app
RUN npm i pnpm -g
RUN pnpm i && pnpm build
CMD pnpm start:prod
EXPOSE 4936
