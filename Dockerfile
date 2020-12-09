FROM node:14.15.1

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

COPY ["package.json", "/usr/src/app"]

RUN npm i

RUN npm install -g nodemon

COPY . .

CMD [ "npm", "run", "start" ]

EXPOSE 3000