# Houston

Welcome to my Houston - the space project. This app lets you query satellites around the globe and get data about / from them.

# Run App

To run the app you have to:

- have docker and docker-compose installed
- specify **.env** file in root project directory
- get key from [N2YO](https://www.n2yo.com/api)

Example **.env** file should have these options set:

- PORT
- N2YO_KEY
- MONGO_INITDB_DATABASE
- MONGO_INITDB_ROOT_USERNAME
- MONGO_INITDB_ROOT_PASSWORD
- DB_USERNAME
- DB_PASSWORD
- DB_URL

After that just type `docker-compose up`

# Something is wrong?

Did you find a bug? Feel free to create an issue ;)
