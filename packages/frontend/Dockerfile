FROM  node:lts-alpine AS builder

WORKDIR /user/app/
COPY package*.json ./
COPY . . 
# Require because we compile Typescript to JS at build time
RUN npm install && npm run build

# Then we serve the build folder using nginx
FROM nginx:stable-alpine
COPY --from=builder /user/app/build/  /usr/share/nginx/html/

EXPOSE 80


