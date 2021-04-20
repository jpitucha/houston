# Houston

Welcome to my Houston - the space project. This app lets you query satellites around the globe and get data about / from them.

# Prepare database

Currently app doesn't support auto update but you can do it manually. The JSON file I'm using was generated on 1 February 2021. To perform update:

- visit [UCS](https://www.ucsusa.org/resources/satellite-database)
- click **Database (Excel format)**
- change headings according to **utils/types/utils.ts**
- remove all columns after **norad** eg. `comments` and `source`
- then open [converter](https://beautifytools.com/excel-to-json-converter.php) and convert .xls to .json
- remove **{** from the beginning of the file and **}** from the end
- optionally you can visit [validator](https://jsonformatter.curiousconcept.com) to prettify and validate your JSON file
- replace original json file from the root directory of project with yours

I'm planning to automate this by hiring scrapper, downloading database and parsing it but this will be done after release working version ;)

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
- JWT_SECRET

After that just type `docker-compose up`

# Something is wrong?

Did you find a bug? Feel free to create an issue ;)
