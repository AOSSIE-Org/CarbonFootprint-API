FROM node:10.16-alpine

# Create app directory
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

COPY package*.json /usr/src/app/
COPY client/package*.json /usr/src/app/client/

RUN npm install --only=prod
# RUN npm install --prefix client --only=prod

# Bundle app source
COPY . /usr/src/app
# RUN npm run build --prefix client

# Add your preference
CMD [ "npm", "start" ]
