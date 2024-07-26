
## Installation

```bash
$ npm install
```

## Database
Running these commands will spin up the postgres db, run migrations, and seed it with test data
```bash
docker-compose up
npx prisma migrate dev
npx prisma db seed
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Urls
```bash
APP: http://localhost:3000
SWAGGER: http://localhost:3000/openapi
SWAGGER-JSON: http://localhost:3000/openapi-json
```
