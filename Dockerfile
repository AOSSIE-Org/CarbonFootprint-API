FROM node:10.16-alpine

# Create app directory
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

COPY package*.json /usr/src/app/
COPY client/package*.json /usr/src/app/client/

RUN npm ci --production
RUN npm ci --prefix client --production

# Bundle app source
COPY . /usr/src/app

ARG REACT_APP_SENTRY_DSN
ARG REACT_APP_AUTH0_DOMAIN
ARG REACT_APP_AUTH0_CLIENT_ID
ARG REACT_APP_AUTH0_CALLBACK_URL
ARG REACT_APP_AUTH0_TOKEN_ENDPOINT
ARG REACT_APP_AUTH0_API_ENDPOINT
ARG REACT_APP_GOOGLE_CLIENT_ID
ARG REACT_APP_GOOGLE_FIT_SCOPES

RUN npm run build --prefix client

# Add your preference
CMD [ "npm", "start" ]
