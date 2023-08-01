ARG PORT

FROM node:16-alpine3.17 as base

WORKDIR /app

COPY package*.json yarn.lock ./

RUN yarn install

COPY . .

RUN yarn build

FROM nginx:1.25-alpine-slim

COPY ./nginx.conf /etc/nginx/templates/nginx.conf.template

RUN rm -rf /usr/share/nginx/html/*

COPY --from=base /app/dist /usr/share/nginx/html/

EXPOSE ${PORT}

CMD ["nginx", "-g", "daemon off;"]