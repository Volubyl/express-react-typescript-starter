FROM  node:lts-alpine AS builder

WORKDIR /user/app/
COPY . . 
# Require because we compile Typescript to JS at build time
RUN npm install && npm run build

FROM  node:lts-alpine AS runner
WORKDIR /user/app/

COPY package*.json  ./
COPY scripts/ ./scripts

RUN npm i -E --production
# We only copy the build folder (the build result) containing the JS files 
COPY --from=builder /user/app/build ./build
EXPOSE 9000

CMD npm run start
