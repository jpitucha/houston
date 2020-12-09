FROM node:14.15.1

WORKDIR /houston

COPY ["package.json", "package-lock.json*", "./"]

RUN npm install

COPY . .

CMD [ "npm", "run", "start" ]