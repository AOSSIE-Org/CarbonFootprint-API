FROM node:10.16-alpine

# Create app directory
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

COPY package*.json /usr/src/app/
COPY client/package*.json /usr/src/app/client/

RUN npm install --only=prod
RUN npm install --prefix client --only=prod
# can be uncommented if gitbook is served from docker container
# RUN npm install gitbook-cli -g

COPY . /usr/src/app
# Build gitbook docs
RUN npm run build:docs --prefix docs
# Build react bundle
RUN npm run build --prefix client && rm -rf client/node_modules/

# Add your preference
CMD [ "npm", "start" ]
