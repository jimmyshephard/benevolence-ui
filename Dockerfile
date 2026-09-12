FROM node:24-alpine as build

RUN npm i -g pnpm@11

WORKDIR /app

COPY package.json pnpm-lock.yaml ./

RUN pnpm install --frozen-lockfile || pnpm install --force

COPY . .

RUN pnpm build

FROM nginx:1.25-alpine

COPY nginx.conf /etc/nginx/nginx.conf

COPY --from=build /app/dist/benevolence-ui /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
