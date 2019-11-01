# interview-challenge-backend
interview-challenge-backend: Express, GraphQL, Sequelize, Postgres

## How do I spin up the backend? ##

1.) First and foremost, clone and spin up the client/front end repo: 
https://github.com/alecluna/interview-challenge-frontend

2.) In another terminal instance, clone this repo and install dependencies using your
favorite package manager that's not npm (go yarn 🧶)

3.) We first want to generate a json file with random colors, I wrote a node script to do that, run 
`npm run generate-colors` or `yarn run generate-colors`, however if this script is giving you trouble then 
`colors.json` should already be populated with random color data

4.) Next we need to set up Docker and Postgres, run in terminal:
`docker run -d -p 5432:5432 --name my-postgres-container -e POSTGRES_PASSWORD=mysecretpassword postgres`

This will spin up a local instance of Docker on port `5432`

5.) when this is finished, run `docker exec -it my-postgres bash` to spin up and enter the docker container

6.) once inside the container, run `psql -U postgres` to open postgrest through the user "postgres"

7.) We need to create a new postgres database so run `CREATE DATABASE database_development;` . This is the name I'm using
in the sequelize config but you can name yours whatever you want. Exit out of postgres with `\q` and `exit` container.

8.) I usually double check docker is running on port 5432 before running migrating and seeding my db
run `docker ps` to view your container instance, mine looks like this:
```
d2f8561c1eb2        postgres            "docker-entrypoint.s…"   8 hours ago         Up 8 hours          0.0.0.0:5432->5432/tcp   my-postgres
```
9.) Ok, we now have our db set up but no data, run `sequelize db:migrate` to migrate the models to your db, 
these should already be specified from the cloned project.

10.) Seed the database with your colors.json data, `sequelize seed:create --name colors`


11.) Finally, run yarn start or npm start and the project should be good to go! The client should automaticlly detect the 
API and start fetching color data from the newly populated db. 

