FROM node:16.16.0 as build-deps
WORKDIR /usr/src/app
COPY package.json yarn.lock ./
RUN yarn install
COPY . ./
RUN yarn run build

FROM nginx:1.12-alpine
COPY --from=build-deps /usr/src/app/dist /usr/share/nginx/html
COPY default ./etc/nginx/conf.d/default.conf
COPY .env /usr/share/nginx/html/
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]

